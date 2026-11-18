package lumen

import kotlin.math.PI
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.exp
import kotlin.math.floor
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.math.tan
import kotlin.random.Random

/* ============================================================
   FLUTTERLIGHT — Kotlin/JS front end: the 15,000-particle WebGL
   engine (same family as the particle film) + the game UI.
   Raw JS interop is kept deliberately tiny: a handful of js()
   gateway functions, everything else goes through `dynamic`.
   ============================================================ */

private fun win(): dynamic = js("window")
private fun doc(): dynamic = js("document")
private fun store(): dynamic = js("localStorage")
private fun mkf32(n: Int): dynamic {
    val w: dynamic = js("window")
    return w.__mk(n)
}
private fun E(id: String): dynamic = doc().getElementById(id)

private const val MAXN = 15000
private const val SN = 380
private val TAU = 2.0 * PI
private const val SAVE_KEY = "flutterlight_kt_v1"

private var S = GameState()

private val BANDNAMES = arrayOf("RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "INDIGO", "VIOLET")
private val BANDHUES = doubleArrayOf(0.0, 0.08, 0.16, 0.30, 0.44, 0.60, 0.72)

/* ============================================================
   ENGINE — per-particle tables and shape functions
   ============================================================ */

private object Eng {
    val U = DoubleArray(MAXN)
    val V = DoubleArray(MAXN)
    val R1 = DoubleArray(MAXN)
    val R2 = DoubleArray(MAXN)
    val R3 = DoubleArray(MAXN)
    val R4 = DoubleArray(MAXN)
    val pos = DoubleArray(MAXN * 3)
    val HEART = DoubleArray(MAXN * 3)
    var heartBuilt = false
    val KA = DoubleArray(3)
    val KB = DoubleArray(3)
    val KC = DoubleArray(3)
    val TESSV = DoubleArray(64)
    val TESSA = IntArray(32)
    val TESSB = IntArray(32)
    val T3 = DoubleArray(3)
    private val outlines = HashMap<String, Array<DoubleArray>>()

    init {
        for (i in 0 until MAXN) {
            U[i] = (i * 0.618033988749895) % 1.0
            V[i] = (i * 0.7548776662466927) % 1.0
            R1[i] = Random.nextDouble()
            R2[i] = Random.nextDouble()
            R3[i] = Random.nextDouble()
            R4[i] = Random.nextDouble()
        }
        var vi = 0
        var a = -1.0
        while (a <= 1.0) {
            var b = -1.0
            while (b <= 1.0) {
                var c = -1.0
                while (c <= 1.0) {
                    var d = -1.0
                    while (d <= 1.0) {
                        TESSV[vi] = a; TESSV[vi + 1] = b; TESSV[vi + 2] = c; TESSV[vi + 3] = d
                        vi += 4
                        d += 2.0
                    }
                    c += 2.0
                }
                b += 2.0
            }
            a += 2.0
        }
        var ei = 0
        for (p in 0 until 16) {
            for (q in p + 1 until 16) {
                var diff = 0
                for (k in 0 until 4) {
                    if (TESSV[p * 4 + k] != TESSV[q * 4 + k]) diff++
                }
                if (diff == 1) {
                    TESSA[ei] = p; TESSB[ei] = q; ei++
                }
            }
        }
    }

    /* heart: Taubin implicit surface, rejection-sampled shell (lazy) */
    fun ensureHeart() {
        if (heartBuilt) return
        var count = 0
        var att = 0
        var eps = 0.0045
        while (count < MAXN && att < 2400000) {
            val x = (Random.nextDouble() * 2.0 - 1.0) * 1.35
            val y = (Random.nextDouble() * 2.0 - 1.0) * 0.75
            val z = (Random.nextDouble() * 2.0 - 1.0) * 1.15
            att++
            val a = x * x + 2.25 * y * y + z * z - 1.0
            val f = a * a * a - x * x * z * z * z - 0.1125 * y * y * z * z * z
            if (abs(f) < eps) {
                val j = count * 3
                HEART[j] = x * 0.95; HEART[j + 1] = z * 0.95; HEART[j + 2] = y * 0.95
                count++
            }
            if (att % 200000 == 0 && count < MAXN) eps *= 1.7
        }
        while (count < MAXN) {
            val src = (Random.nextDouble() * max(1, count)).toInt()
            val j = count * 3
            val k = src * 3
            HEART[j] = HEART[k] + (Random.nextDouble() - 0.5) * 0.02
            HEART[j + 1] = HEART[k + 1] + (Random.nextDouble() - 0.5) * 0.02
            HEART[j + 2] = HEART[k + 2] + (Random.nextDouble() - 0.5) * 0.02
            count++
        }
        heartBuilt = true
    }

    private fun poly(n: Int, R: Double): Array<DoubleArray> {
        val p = Array(n) { DoubleArray(2) }
        for (k in 0 until n) {
            val a = -PI / 2 + k * TAU / n
            p[k][0] = cos(a) * R
            p[k][1] = sin(a) * R
        }
        return p
    }

    private fun starPts(): Array<DoubleArray> {
        val p = Array(10) { DoubleArray(2) }
        for (k in 0 until 10) {
            val a = -PI / 2 + k * PI / 5
            val r = if (k % 2 == 1) 0.66 else 1.7
            p[k][0] = cos(a) * r
            p[k][1] = sin(a) * r
        }
        return p
    }

    fun outline(key: String): Array<DoubleArray> = outlines.getOrPut(key) {
        when (key) {
            "tri" -> poly(3, 1.55)
            "square" -> poly(4, 1.45)
            "pent" -> poly(5, 1.45)
            "hex" -> poly(6, 1.35)
            "star" -> starPts()
            else -> poly(3, 1.5)
        }
    }

    fun knotC(T: Double, o: DoubleArray) {
        val w = 2.0 + cos(3.0 * T)
        o[0] = w * cos(2.0 * T) * 0.55
        o[1] = sin(3.0 * T) * 0.63
        o[2] = w * sin(2.0 * T) * 0.55
    }

    /* live 3-D position of particle i in formation `key` at time t */
    fun shapePos(key: String, i: Int, t: Double, out: DoubleArray) {
        val u = U[i]
        val v = V[i]
        val r1 = R1[i]; val r2 = R2[i]; val r3 = R3[i]; val r4 = R4[i]
        val j = i * 3
        when (key) {
            "sphere" -> {
                val th = u * TAU
                val y0 = 1.0 - 2.0 * v
                val R = 1.55 * (1.0 + 0.05 * sin(t * 1.1 + y0 * 1.8))
                val rr = sqrt(max(0.0, 1.0 - y0 * y0))
                out[0] = rr * cos(th) * R
                out[1] = y0 * R
                out[2] = rr * sin(th) * R
            }
            "tri", "square", "pent", "hex", "star" -> {
                val P = outline(key)
                val C = P.size
                val e = min(C - 1, (u * C).toInt())
                val f = u * C - e
                val p0 = P[e]
                val p1 = P[(e + 1) % C]
                val br = 1.0 + 0.03 * sin(t * 1.4)
                out[0] = (p0[0] + (p1[0] - p0[0]) * f) * br
                out[2] = (p0[1] + (p1[1] - p0[1]) * f) * br
                out[1] = (if (key == "star") 0.4 else 0.55) * (v * 2.0 - 1.0)
            }
            "heart" -> {
                ensureHeart()
                val s0 = max(0.0, sin(t * 4.2)).pow(10)
                val s1 = max(0.0, sin(t * 4.2 - 0.7)).pow(10)
                val sc = 1.0 + 0.085 * (s0 + 0.55 * s1)
                out[0] = HEART[j] * sc
                out[1] = HEART[j + 1] * sc
                out[2] = HEART[j + 2] * sc
            }
            "galaxy" -> {
                if (r4 < 0.05) {
                    val ang = r1 * TAU
                    val cc = r2 * 2.0 - 1.0
                    val sq = sqrt(max(0.0, 1.0 - cc * cc))
                    val r = 1.2 + 1.6 * r3
                    out[0] = cos(ang) * sq * r
                    out[1] = cc * r * 0.85
                    out[2] = sin(ang) * sq * r
                } else {
                    val ai = (u * 3).toInt()
                    val rad = 0.3 + 2.0 * v.pow(0.6)
                    val fuzz = (r2 - 0.5) * 2.0 * (0.14 + 0.3 * rad / 2.3)
                    val ang = ai * (TAU / 3.0) + rad * 2.15 + fuzz + t * (0.5 + 0.5 / (0.6 + rad))
                    val th = 0.26 * exp(-rad * 1.1) + 0.035
                    out[0] = rad * cos(ang)
                    out[1] = (r3 - 0.5) * 2.0 * th
                    out[2] = rad * sin(ang)
                }
            }
            "mobius" -> {
                val uu = u * 2.0 * TAU + t * 0.8
                val w = v * 2.0 - 1.0
                val c = cos(uu / 2.0)
                val s = sin(uu / 2.0)
                val rr = 1.25 + 0.6 * w * c
                out[0] = rr * cos(uu)
                out[1] = 0.6 * w * s
                out[2] = rr * sin(uu)
            }
            "klein" -> {
                val uu = u * TAU
                val vv = v * TAU + t * 0.35
                val cu = cos(uu / 2.0)
                val su = sin(uu / 2.0)
                val sv = sin(vv)
                val s2v = sin(2.0 * vv)
                val r = 2.0 + cu * sv - su * s2v
                out[0] = r * cos(uu) * 0.55
                out[1] = (su * sv + cu * s2v) * 0.75
                out[2] = r * sin(uu) * 0.55
            }
            "knot" -> {
                val T = u * TAU + t * 0.14
                knotC(T, KA); knotC(T + 0.01, KB); knotC(T - 0.01, KC)
                var tx = KB[0] - KC[0]; var ty = KB[1] - KC[1]; var tz = KB[2] - KC[2]
                var l = sqrt(tx * tx + ty * ty + tz * tz)
                if (l <= 0.0) l = 1.0
                tx /= l; ty /= l; tz /= l
                var ax = ty * 0.15 - tz
                var ay = tz * 0.25 - tx * 0.15
                var az = tx - ty * 0.25
                l = sqrt(ax * ax + ay * ay + az * az)
                if (l < 1e-4) { ax = 1.0; ay = 0.0; az = 0.0; l = 1.0 }
                ax /= l; ay /= l; az /= l
                val bx = ty * az - tz * ay
                val by = tz * ax - tx * az
                val bz = tx * ay - ty * ax
                val ph = v * TAU + t * 0.6
                val off = 0.17 * (0.8 + 0.4 * r4)
                val co = cos(ph) * off
                val si = sin(ph) * off
                out[0] = KA[0] + ax * co + bx * si
                out[1] = KA[1] + ay * co + by * si
                out[2] = KA[2] + az * co + bz * si
            }
            "tesseract" -> {
                val e = (u * 32).toInt()
                val q = u * 32.0 - e
                val va = TESSA[e] * 4
                val vb = TESSB[e] * 4
                val px = TESSV[va] + (TESSV[vb] - TESSV[va]) * q
                val py = TESSV[va + 1] + (TESSV[vb + 1] - TESSV[va + 1]) * q
                val pz = TESSV[va + 2] + (TESSV[vb + 2] - TESSV[va + 2]) * q
                val pw = TESSV[va + 3] + (TESSV[vb + 3] - TESSV[va + 3]) * q
                val A = t * 0.5
                val B = t * 0.35
                val ca = cos(A); val sa = sin(A); val cb = cos(B); val sb = sin(B)
                val x1 = px * ca - pw * sa
                val w1 = px * sa + pw * ca
                val y1 = py * cb - pz * sb
                val z1 = py * sb + pz * cb
                val k = (3.2 / (3.2 - w1)) * 0.85
                out[0] = x1 * k
                out[1] = y1 * k
                out[2] = z1 * k
            }
            "nova" -> {
                val rad = 3.2 * (0.3 + 0.7 * r3)
                val phi = r1 * TAU + t * 0.42
                val e = (r2 * 2.0 - 1.0) * 0.92
                val sq = sqrt(max(0.0, 1.0 - e * e))
                out[0] = cos(phi) * sq * rad
                out[1] = e * rad * 0.62 + 0.12 * sin(t * 0.9 + r4 * TAU)
                out[2] = sin(phi) * sq * rad
            }
            else -> {
                out[0] = 0.0; out[1] = 0.0; out[2] = 0.0
            }
        }
    }
}

/* ============================================================
   BLEND — staggered comet-arc transitions between formations
   ============================================================ */

private fun ioCubic(p: Double): Double =
    if (p < 0.5) 4.0 * p * p * p else 1.0 - (-2.0 * p + 2.0).pow(3) / 2.0

private fun backE(k: Double): (Double) -> Double = { p ->
    val q = p - 1.0
    1.0 + (k + 1.0) * q * q * q + k * q * q
}

private object Blend {
    var active = false
    var key = "sphere"
    var t = 0.0
    var dur = 1.0
    var span = 1.0
    var ease: ((Double) -> Double)? = null
    val from = DoubleArray(MAXN * 3)
    val sw = DoubleArray(MAXN * 3)
    val delays = DoubleArray(MAXN)
}

private fun startBlend(key: String, dur: Double, ease: (Double) -> Double, stagger: Double, swirlAmp: Double) {
    Eng.pos.copyInto(Blend.from)
    for (i in 0 until MAXN) {
        val j = i * 3
        Eng.shapePos(key, i, Engine.t, Eng.T3)
        val tx = Eng.T3[0] - Blend.from[j]
        val ty = Eng.T3[1] - Blend.from[j + 1]
        val tz = Eng.T3[2] - Blend.from[j + 2]
        val tl = sqrt(tx * tx + ty * ty + tz * tz)
        if (tl > 0.03) {
            val ax = Eng.R2[i] - 0.5
            val ay = Eng.R3[i] - 0.5
            val az = Eng.R4[i] - 0.5
            val al = sqrt(ax * ax + ay * ay + az * az)
            val nx: Double; val ny: Double; val nz: Double
            if (al <= 0.0) { nx = 1.0; ny = 0.0; nz = 0.0 } else { nx = ax / al; ny = ay / al; nz = az / al }
            val cx = ty * nz - tz * ny
            val cy = tz * nx - tx * nz
            val cz = tx * ny - ty * nx
            val cl = sqrt(cx * cx + cy * cy + cz * cz)
            val mag = (Eng.R1[i] - 0.5) * 2.0 * swirlAmp
            if (cl <= 0.0) {
                Blend.sw[j] = 0.0; Blend.sw[j + 1] = 0.0; Blend.sw[j + 2] = 0.0
            } else {
                Blend.sw[j] = cx / cl * mag
                Blend.sw[j + 1] = cy / cl * mag
                Blend.sw[j + 2] = cz / cl * mag
            }
        } else {
            Blend.sw[j] = 0.0; Blend.sw[j + 1] = 0.0; Blend.sw[j + 2] = 0.0
        }
        Blend.delays[i] = stagger * dur * Eng.R3[i]
    }
    Blend.key = key
    Blend.t = 0.0
    Blend.dur = dur
    Blend.span = dur * (1.0 - stagger)
    Blend.ease = ease
    Blend.active = true
}

/* ============================================================
   ENGINE — camera, ceremony state machine, display density
   ============================================================ */

private class Cam(val d: Double, val el: Double, val spin: Double)

private object Engine {
    val CAMS = mapOf(
        "sphere" to Cam(4.6, 0.24, 0.12),
        "tri" to Cam(4.6, 0.35, 0.22),
        "square" to Cam(4.6, 0.35, 0.22),
        "pent" to Cam(4.6, 0.35, 0.22),
        "hex" to Cam(4.6, 0.38, 0.20),
        "star" to Cam(4.9, 0.30, 0.26),
        "heart" to Cam(4.6, 0.14, 0.10),
        "galaxy" to Cam(5.9, 0.96, 0.07),
        "mobius" to Cam(4.7, 0.45, 0.16),
        "klein" to Cam(4.7, 0.55, 0.20),
        "knot" to Cam(5.3, 0.55, 0.16),
        "tesseract" to Cam(6.2, 0.28, 0.18),
        "nova" to Cam(6.8, 0.30, 0.09)
    )
    var t = 0.0
    var key = "sphere"
    var camAz = 0.6
    var camD = 4.6
    var camEl = 0.24
    var camSpin = 0.12
    var hueCur = 0.53
    var tapGlow = 0.0
    var displayN = 300
    var cerPhase = -1          // -1 idle; 0..3 ceremony phases
    var cerKey = "sphere"
    var cerT = 0.0
    fun cam(key: String): Cam = CAMS[key] ?: Cam(4.6, 0.3, 0.2)
}

/* ============================================================
   WEBGL
   ============================================================ */

private val VSH = """
precision highp float;
attribute vec3 aPos;
attribute vec4 aSeed;
uniform mat4 uProj;
uniform float uAz, uEl, uDist, uTime, uHue, uSat, uLight, uBright, uSize, uScale;
varying vec3 vColor;
varying float vAlpha;
vec3 hsl2rgb(float h, float s, float l) {
  vec3 rgb = clamp(abs(mod(h*6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return l + s*(rgb - 0.5)*(1.0 - abs(2.0*l - 1.0));
}
void main() {
  float cy = cos(uAz), sy = sin(uAz), cx = cos(uEl), sx = sin(uEl);
  float x1 =  cy*aPos.x + sy*aPos.z;
  float z1 = -sy*aPos.x + cy*aPos.z;
  float y1 =  cx*aPos.y - sx*z1;
  float z2 =  sx*aPos.y + cx*z1;
  gl_Position = uProj * vec4(x1, y1, z2 - uDist, 1.0);
  float viewZ = max(0.3, uDist - z2);
  float twk = 0.72 + 0.28*sin(uTime*(1.2 + 2.2*fract(aSeed.z*7.31)) + aSeed.z*61.7);
  gl_PointSize = min(uSize*uScale*(0.5 + 0.9*aSeed.y)*twk*6.0/viewZ, 48.0);
  float h = fract(uHue + 0.09*aPos.y + 0.06*aPos.x + 0.14*aSeed.x + uTime*0.012);
  vColor = hsl2rgb(h, uSat, uLight) * uBright;
  vAlpha = 0.55 + 0.45*twk;
}
"""

private val FSH = """
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  float a = max(0.0, 1.0 - d);
  a *= a;
  gl_FragColor = vec4(vColor, a * vAlpha);
}
"""

private var canvas: dynamic = null
private var gl: dynamic = null
private var posBuf: dynamic = null
private var seedBuf: dynamic = null
private var starBuf: dynamic = null
private var starSeedBuf: dynamic = null
private var posF32: dynamic = null
private var seedF32: dynamic = null
private var starF32: dynamic = null
private var starSeedF32: dynamic = null
private var projF32: dynamic = null
private var APOS: dynamic = null
private var ASEED: dynamic = null
private var uProj: dynamic = null
private var uAz: dynamic = null
private var uEl: dynamic = null
private var uDist: dynamic = null
private var uTime: dynamic = null
private var uHue: dynamic = null
private var uSat: dynamic = null
private var uLight: dynamic = null
private var uBright: dynamic = null
private var uSize: dynamic = null
private var uScale: dynamic = null

private var distFactor = 1.0
private var Wc = 0
private var Hc = 0

private fun initGl(): Boolean {
    canvas = doc().getElementById("c")
    gl = canvas.getContext("webgl", js("({antialias:false,alpha:false,depth:false,stencil:false,powerPreference:'high-performance'})"))
    if (gl == null) {
        E("fallback").style.display = "grid"
        return false
    }
    fun mkShader(type: Int, src: String): dynamic {
        val s = gl.createShader(type)
        gl.shaderSource(s, src)
        gl.compileShader(s)
        if (!(gl.getShaderParameter(s, gl.COMPILE_STATUS) as Boolean)) {
            win().console.log(gl.getShaderInfoLog(s))
            return null
        }
        return s
    }
    val vs = mkShader(gl.VERTEX_SHADER, VSH)
    val fs = mkShader(gl.FRAGMENT_SHADER, FSH)
    if (vs == null || fs == null) {
        E("fallback").style.display = "grid"
        return false
    }
    val prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!(gl.getProgramParameter(prog, gl.LINK_STATUS) as Boolean)) {
        win().console.log(gl.getProgramInfoLog(prog))
        E("fallback").style.display = "grid"
        return false
    }
    gl.useProgram(prog)
    APOS = gl.getAttribLocation(prog, "aPos")
    ASEED = gl.getAttribLocation(prog, "aSeed")
    gl.enableVertexAttribArray(APOS)
    gl.enableVertexAttribArray(ASEED)
    uProj = gl.getUniformLocation(prog, "uProj")
    uAz = gl.getUniformLocation(prog, "uAz")
    uEl = gl.getUniformLocation(prog, "uEl")
    uDist = gl.getUniformLocation(prog, "uDist")
    uTime = gl.getUniformLocation(prog, "uTime")
    uHue = gl.getUniformLocation(prog, "uHue")
    uSat = gl.getUniformLocation(prog, "uSat")
    uLight = gl.getUniformLocation(prog, "uLight")
    uBright = gl.getUniformLocation(prog, "uBright")
    uSize = gl.getUniformLocation(prog, "uSize")
    uScale = gl.getUniformLocation(prog, "uScale")
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    gl.clearColor(0.012, 0.01, 0.032, 1.0)

    posF32 = mkf32(MAXN * 3)
    seedF32 = mkf32(MAXN * 4)
    for (i in 0 until MAXN) {
        seedF32[i * 4] = Eng.R1[i]
        seedF32[i * 4 + 1] = Eng.R2[i]
        seedF32[i * 4 + 2] = Eng.R3[i]
        seedF32[i * 4 + 3] = Eng.R4[i]
    }
    starF32 = mkf32(SN * 3)
    starSeedF32 = mkf32(SN * 4)
    for (i in 0 until SN) {
        val a = Random.nextDouble() * TAU
        val cc = Random.nextDouble() * 2.0 - 1.0
        val sq = sqrt(1.0 - cc * cc)
        val r = 26.0 + 36.0 * Random.nextDouble()
        starF32[i * 3] = cos(a) * sq * r
        starF32[i * 3 + 1] = cc * r
        starF32[i * 3 + 2] = sin(a) * sq * r
        starSeedF32[i * 4] = Random.nextDouble()
        starSeedF32[i * 4 + 1] = 0.3 + 0.7 * Random.nextDouble()
        starSeedF32[i * 4 + 2] = Random.nextDouble()
        starSeedF32[i * 4 + 3] = Random.nextDouble()
    }
    projF32 = mkf32(16)

    posBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, posF32, gl.DYNAMIC_DRAW)
    seedBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf)
    gl.bufferData(gl.ARRAY_BUFFER, seedF32, gl.STATIC_DRAW)
    starBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, starBuf)
    gl.bufferData(gl.ARRAY_BUFFER, starF32, gl.STATIC_DRAW)
    starSeedBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, starSeedBuf)
    gl.bufferData(gl.ARRAY_BUFFER, starSeedF32, gl.STATIC_DRAW)
    return true
}

private fun setProj(aspect: Double) {
    val f = 1.0 / tan(21.0 * PI / 180.0)
    val near = 0.1
    val far = 100.0
    val m = DoubleArray(16)
    m[0] = f / aspect
    m[5] = f
    m[10] = -(far + near) / (far - near)
    m[11] = -1.0
    m[14] = -(2.0 * far * near) / (far - near)
    for (k in 0 until 16) projF32[k] = m[k]
    gl.uniformMatrix4fv(uProj, false, projF32)
}

private fun resize() {
    val dprRaw: dynamic = win().devicePixelRatio
    val dpr = if (dprRaw == null) 1.0 else min(2.0, dprRaw as Double)
    val cw = canvas.clientWidth as Double
    val ch = canvas.clientHeight as Double
    val w = max(1, floor(cw * dpr).toInt())
    val h = max(1, floor(ch * dpr).toInt())
    if (w == Wc && h == Hc) return
    Wc = w; Hc = h
    canvas.width = w
    canvas.height = h
    gl.viewport(0, 0, w, h)
    setProj(w.toDouble() / h.toDouble())
    gl.uniform1f(uScale, h.toDouble() / 380.0)
    distFactor = min(1.55, max(1.0, 0.9 / (w.toDouble() / h.toDouble())))
}

/* ============================================================
   SAVE / LOAD
   ============================================================ */

private fun saveGame() {
    S.lastSave = win().Date.now() as Double
    S.lastIncome = incomeOf(S, S.t)
    store().setItem(SAVE_KEY, serialize(S))
}

private fun loadGame(): Boolean {
    val raw: dynamic = store().getItem(SAVE_KEY)
    if (raw == null) return false
    val parsed = deserialize(raw as String)
    if (parsed == null) return false
    S = parsed
    return true
}

private fun hueTarget(): Double {
    var b = -1
    for (k in 0..6) if (S.bands[k] > 0) b = k
    if (b < 0) return 0.53
    return BANDHUES[b] + 0.015 * S.bands[b]
}

/* ============================================================
   UI
   ============================================================ */

private fun toast(msg: String) {
    val d = doc().createElement("div")
    d.className = "toast"
    d.textContent = msg
    E("toasts").appendChild(d)
    win().setTimeout({ _: dynamic -> d.classList.add("bye") }, 2800)
    win().setTimeout({ _: dynamic -> d.remove() }, 3800)
    val kids: dynamic = E("toasts").children
    val len = kids.length as Int
    if (len > 4) kids[0].remove()
}

private fun cerOn(nameText: String, subText: String) {
    E("cerName").textContent = nameText
    E("cerSub").textContent = subText
    E("cer").classList.add("on")
}

private fun cerOff() {
    E("cer").classList.remove("on")
}

private class BandRow(
    val idx: Int,
    val btn: dynamic,
    val cost: dynamic,
    val sub: dynamic,
    val p0: dynamic, val p1: dynamic, val p2: dynamic, val p3: dynamic, val p4: dynamic
) {
    fun update() {
        val lvl = S.bands[idx]
        p0.className = if (lvl > 0) "f" else ""
        p1.className = if (lvl > 1) "f" else ""
        p2.className = if (lvl > 2) "f" else ""
        p3.className = if (lvl > 3) "f" else ""
        p4.className = if (lvl > 4) "f" else ""
        sub.textContent = if (lvl >= Bal.bandMaxLvl) "MASTERED" else "×1.10 all production"
        val c = bandCost(idx, lvl)
        btn.disabled = lvl >= Bal.bandMaxLvl || S.light < c
        cost.textContent = if (lvl >= Bal.bandMaxLvl) "DONE" else fmt(c)
    }
}

private val bandRows = ArrayList<BandRow>()

private fun buildSpectrumRows() {
    val wrap = E("bandRows")
    for (b in 0..6) {
        val row = doc().createElement("div"); row.className = "row"
        val who = doc().createElement("div"); who.className = "who"
        val nameB = doc().createElement("b")
        nameB.textContent = BANDNAMES[b] + " BAND"
        val pips = doc().createElement("span"); pips.className = "pips"
        val p0 = doc().createElement("i")
        val p1 = doc().createElement("i")
        val p2 = doc().createElement("i")
        val p3 = doc().createElement("i")
        val p4 = doc().createElement("i")
        pips.appendChild(p0); pips.appendChild(p1); pips.appendChild(p2)
        pips.appendChild(p3); pips.appendChild(p4)
        nameB.appendChild(pips)
        val sub = doc().createElement("span")
        who.appendChild(nameB); who.appendChild(sub)
        val btn = doc().createElement("button"); btn.className = "buy"
        btn.textContent = "+1"
        val cost = doc().createElement("span"); cost.className = "cost"
        btn.appendChild(cost)
        row.appendChild(who); row.appendChild(btn)
        wrap.appendChild(row)
        val band = b
        btn.addEventListener("click", { _: dynamic ->
            val res = buyBand(S, band)
            if (res == 2) toast("CHROMATIC RESONANCE · +1 LIGHT LEVEL")
            refreshUI()
            saveGame()
        })
        bandRows.add(BandRow(band, btn, cost, sub, p0, p1, p2, p3, p4))
    }
}

private class ShopRow(val btn: dynamic, val cost: dynamic, val sub: dynamic, val update: (ShopRow) -> Unit)

private val shopRows = ArrayList<ShopRow>()

private fun addShopRow(label: String, onClick: () -> Unit, update: (ShopRow) -> Unit) {
    val wrap = E("shopRows")
    val row = doc().createElement("div"); row.className = "row"
    val who = doc().createElement("div"); who.className = "who"
    val b = doc().createElement("b"); b.textContent = label
    val sub = doc().createElement("span")
    who.appendChild(b); who.appendChild(sub)
    val btn = doc().createElement("button"); btn.className = "buy"
    btn.textContent = "BUY"
    val cost = doc().createElement("span"); cost.className = "cost"
    btn.appendChild(cost)
    row.appendChild(who); row.appendChild(btn)
    wrap.appendChild(row)
    btn.addEventListener("click", { _: dynamic ->
        onClick()
        refreshUI()
        saveGame()
    })
    shopRows.add(ShopRow(btn, cost, sub, update))
}

private fun buildShopRows() {
    addShopRow("REFRACTION",
        { buyShop(S, "ref") },
        { r ->
            val lvl = S.ref
            val c = shopCost("ref", lvl)
            r.sub.textContent = "×1.25 production / level" + (if (lvl > 0) " · level " + lvl else "")
            r.btn.disabled = c < 0.0 || S.prisms < c
            r.cost.textContent = if (c < 0.0) "MAX" else "◆ " + fmt(c)
        })
    addShopRow("HEAD START",
        { buyShop(S, "head") },
        { r ->
            val lvl = S.head
            val c = shopCost("head", lvl)
            r.sub.textContent = "+25 starting particles / level" + (if (lvl > 0) " · level " + lvl else "")
            r.btn.disabled = c < 0.0 || S.prisms < c
            r.cost.textContent = if (c < 0.0) "MAX" else "◆ " + fmt(c)
        })
    addShopRow("AFTERGLOW",
        { buyShop(S, "after") },
        { r ->
            val lvl = S.after
            val c = shopCost("after", lvl)
            val cap = if (lvl > 0) Bal.afterCapsH[lvl - 1] else Bal.baseAfterCapH
            r.sub.textContent = "offline production cap: " + (if (cap.isInfinite()) "∞" else fmt(cap) + "h")
            r.btn.disabled = c < 0.0 || S.prisms < c
            r.cost.textContent = if (c < 0.0) "MAX" else "◆ " + fmt(c)
        })
    addShopRow("MOMENTUM",
        { buyShop(S, "mom") },
        { r ->
            val lvl = S.mom
            val c = shopCost("mom", lvl)
            val cap = Bal.momCaps[min(lvl, Bal.momCaps.size - 1)]
            r.sub.textContent = "+2%/min since gather, cap " + fmtMult(cap) + (if (lvl > 0) " · level " + lvl else "")
            r.btn.disabled = c < 0.0 || S.prisms < c
            r.cost.textContent = if (c < 0.0) "MAX" else "◆ " + fmt(c)
        })
    addShopRow("AUTOPILOT · PARTICLES",
        { buyAuto(S, "autoP") },
        { r ->
            r.sub.textContent = if (S.autoP) "ONLINE" else "auto-buys particles when affordable"
            r.btn.disabled = S.autoP || S.prisms < Bal.autoP
            r.cost.textContent = if (S.autoP) "ACTIVE" else "◆ " + Bal.autoP
        })
    addShopRow("AUTOPILOT · LIGHT",
        { buyAuto(S, "autoL") },
        { r ->
            r.sub.textContent = if (S.autoL) "ONLINE" else "auto-buys light levels when affordable"
            r.btn.disabled = S.autoL || S.prisms < Bal.autoL
            r.cost.textContent = if (S.autoL) "ACTIVE" else "◆ " + Bal.autoL
        })
    addShopRow("AUTOPILOT · SPECTRUM",
        { buyAuto(S, "autoS") },
        { r ->
            r.sub.textContent = if (S.autoS) "ONLINE" else "auto-buys spectrum bands when affordable"
            r.btn.disabled = S.autoS || S.prisms < Bal.autoS
            r.cost.textContent = if (S.autoS) "ACTIVE" else "◆ " + Bal.autoS
        })
}

private var curTab = "swarm"

private fun panelShow(t: String) {
    E("panel").classList.add("on")
    val secs = arrayOf("swarm", "spectrum", "gather", "prism")
    for (s in secs) {
        E("tab-" + s).style.display = if (s == t) "" else "none"
    }
}

private fun setupTabs() {
    val btns: dynamic = doc().querySelectorAll("#tabs button")
    val n = btns.length as Int
    for (i in 0 until n) {
        val btn = btns[i]
        btn.addEventListener("click", { _: dynamic ->
            curTab = btn.dataset.t as String
            for (j in 0 until n) {
                val bj = btns[j]
                bj.className = if (bj == btn) "on" else ""
            }
            panelShow(curTab)
            refreshUI()
        })
    }
}

private fun refreshUI() {
    val inc = incomeOf(S, S.t)
    E("lightVal").textContent = fmt(S.light)
    E("lightRate").textContent = fmt(inc) + " /s"
    E("prismVal").textContent = if (S.prisms > 0 || S.shapes > 0) "◆ " + fmt(S.prisms.toDouble()) else "—"

    if (curTab == "swarm") {
        E("pCount").textContent = fmt(S.P.toDouble())
        E("pInfo").textContent = fmt(
            Bal.perParticle * Bal.lGain.pow(S.L) * shapeMult(S.shapes) *
                spectrumMult(S.bands) * prismMult(S.ref) * momentumMult(S, S.t)
        ) + " light/s each"
        val c1 = particleCost(S.P)
        E("bp1").disabled = S.light < c1 || S.P >= Bal.PCAP
        E("bp1c").textContent = fmt(c1)
        val n10 = min(10, maxParticlesAfford(S.P, S.light))
        val c10 = bulkParticleCost(S.P, min(10, Bal.PCAP - S.P))
        E("bp10").disabled = n10 < 10 || S.P >= Bal.PCAP
        E("bp10c").textContent = fmt(c10)
        val nM = maxParticlesAfford(S.P, S.light)
        E("bpMax").disabled = nM < 1 || S.P >= Bal.PCAP
        E("bpMaxc").textContent = if (nM >= 1) "+" + fmt(nM.toDouble()) else "—"
        E("lCount").textContent = fmt(S.L.toDouble())
        E("lInfo").textContent = "×" + fmt(Bal.lGain.pow(S.L)) + " efficiency"
        val cl1 = lightCost(S.L)
        E("bl1").disabled = S.light < cl1 || S.L >= Bal.LCAP
        E("bl1c").textContent = fmt(cl1)
        val lM = maxLightAfford(S.L, S.light)
        E("blMax").disabled = lM < 1 || S.L >= Bal.LCAP
        E("blMaxc").textContent = if (lM >= 1) "+" + fmt(lM.toDouble()) else "—"
        E("prodBreak").textContent =
            "P " + fmt(S.P.toDouble()) +
                " × level ×" + fmt(Bal.lGain.pow(S.L)) +
                " × shapes " + fmtMult(shapeMult(S.shapes)) +
                " × spectrum " + fmtMult(spectrumMult(S.bands)) +
                " × refraction " + fmtMult(prismMult(S.ref)) +
                " × momentum " + fmtMult(momentumMult(S, S.t))
    }

    if (curTab == "spectrum") {
        for (r in bandRows) r.update()
    }

    if (curTab == "gather") {
        val cur = SHAPES[S.shapes]
        E("curShape").textContent =
            "FORMATION: " + cur.name + " — " + cur.sub +
                " · shapes bonus " + fmtMult(shapeMult(S.shapes))
        val nk = min(S.shapes + 1, SHAPES.size - 1)
        val nx = SHAPES[nk]
        val req = reqFor(S)
        E("nextName").textContent = nx.name
        E("nextSub").textContent = nx.sub + " · " + fmtMult(nx.mult)
        val pg = if (req > 0.0) min(1.0, S.runEarned / req) else 0.0
        E("nextBar").style.width = (pg * 100.0).toString() + "%"
        E("nextReq").textContent =
            "requires " + fmt(req) + " light earned this run (" + fmt(S.runEarned) + ")"
        E("nextPrisms").textContent = "◆ +" + fmt(prismsFor(S.runEarned).toDouble())
        val can = canGather(S)
        E("gatherBtn").disabled = !can
        E("gatherBtn").textContent = if (can) "GATHER" else "NOT YET"
        val mus = StringBuilder()
        for (k in 1 until SHAPES.size) {
            val sh = SHAPES[k]
            val got = k <= S.shapes
            mus.append("<div class=\"musrow\"><span class=\"")
            mus.append(if (got) "got" else "lock")
            mus.append("\">").append(if (got) "◆ " else "◇ ").append(sh.name)
            mus.append("</span><span class=\"")
            mus.append(if (got) "got" else "lock")
            mus.append("\">").append(fmtMult(sh.mult)).append("</span></div>")
        }
        E("museum").innerHTML = mus.toString()
    }

    if (curTab == "prism") {
        E("prismNote").textContent =
            "◆ " + fmt(S.prisms.toDouble()) + " prisms — gathered from runs: cbrt(earnings / 1e4)"
        for (r in shopRows) r.update(r)
    }
}

/* ============================================================
   MAIN LOOP
   ============================================================ */

private fun engineFrame(dt: Double) {
    Engine.t += dt
    var bright = 1.06
    val inCer = Engine.cerPhase >= 0
    if (inCer) {
        Engine.cerT += dt
        when {
            Engine.cerPhase == 0 -> {
                startBlend("nova", 0.5, backE(2.6), 0.25, 1.2)
                Engine.camD = 6.8; Engine.camEl = 0.30; Engine.camSpin = 0.09
                Engine.cerPhase = 1
            }
            Engine.cerPhase == 1 && Engine.cerT >= 0.55 -> {
                startBlend(Engine.cerKey, 1.15, backE(2.4), 0.30, 0.35)
                Engine.cerPhase = 2
            }
            Engine.cerPhase == 2 && Engine.cerT >= 1.7 -> {
                Engine.key = Engine.cerKey
                val cam = Engine.cam(Engine.cerKey)
                Engine.camD = cam.d; Engine.camEl = cam.el; Engine.camSpin = cam.spin
                Engine.cerPhase = 3
            }
            Engine.cerPhase == 3 && Engine.cerT >= 3.0 -> {
                Engine.cerPhase = -1
                cerOff()
            }
        }
        bright = 1.3 + 1.9 * exp(-Engine.cerT * 1.8)
        Engine.displayN = MAXN
    }
    if (Engine.cerPhase < 0) {
        Engine.camSpin = Engine.cam(Engine.key).spin
        Engine.displayN = max(60, min(MAXN, (400.0 * max(1.0, S.P.toDouble()).pow(0.4)).toInt()))
    }
    Engine.camAz += Engine.camSpin * dt

    if (Blend.active) {
        Blend.t += dt
        var anyLive = false
        for (i in 0 until MAXN) {
            val j = i * 3
            var p = (Blend.t - Blend.delays[i]) / Blend.span
            if (p > 1.0) p = 1.0
            else if (p < 0.0) p = 0.0
            else anyLive = true
            Eng.shapePos(Blend.key, i, Engine.t, Eng.T3)
            if (p >= 1.0) {
                Eng.pos[j] = Eng.T3[0]; Eng.pos[j + 1] = Eng.T3[1]; Eng.pos[j + 2] = Eng.T3[2]
            } else {
                val easeFn = Blend.ease
                val e = if (easeFn != null) easeFn(p) else ioCubic(p)
                val wf = sin(PI * p)
                Eng.pos[j] = Blend.from[j] + (Eng.T3[0] - Blend.from[j]) * e + Blend.sw[j] * wf
                Eng.pos[j + 1] = Blend.from[j + 1] + (Eng.T3[1] - Blend.from[j + 1]) * e + Blend.sw[j + 1] * wf
                Eng.pos[j + 2] = Blend.from[j + 2] + (Eng.T3[2] - Blend.from[j + 2]) * e + Blend.sw[j + 2] * wf
            }
        }
        if (!anyLive && Blend.t > Blend.dur) Blend.active = false
    } else {
        val keyNow = Engine.key
        for (i in 0 until MAXN) {
            Eng.shapePos(keyNow, i, Engine.t, Eng.T3)
            val j = i * 3
            Eng.pos[j] = Eng.T3[0]; Eng.pos[j + 1] = Eng.T3[1]; Eng.pos[j + 2] = Eng.T3[2]
        }
    }

    val ht = hueTarget()
    Engine.hueCur += (ht - Engine.hueCur) * min(1.0, dt * 0.6)
    Engine.tapGlow *= exp(-dt * 3.2)
    bright += Engine.tapGlow

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform1f(uTime, Engine.t)
    gl.uniform1f(uAz, Engine.camAz)
    gl.uniform1f(uEl, Engine.camEl)
    gl.uniform1f(uDist, Engine.camD * distFactor)

    gl.bindBuffer(gl.ARRAY_BUFFER, starBuf)
    gl.vertexAttribPointer(APOS, 3, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, starSeedBuf)
    gl.vertexAttribPointer(ASEED, 4, gl.FLOAT, false, 0, 0)
    gl.uniform1f(uHue, 0.6); gl.uniform1f(uSat, 0.4); gl.uniform1f(uLight, 0.8)
    gl.uniform1f(uBright, 0.7); gl.uniform1f(uSize, 3.2)
    gl.drawArrays(gl.POINTS, 0, SN)

    for (k in 0 until MAXN * 3) posF32[k] = Eng.pos[k]
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, posF32)
    gl.vertexAttribPointer(APOS, 3, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf)
    gl.vertexAttribPointer(ASEED, 4, gl.FLOAT, false, 0, 0)
    gl.uniform1f(uHue, Engine.hueCur)
    gl.uniform1f(uSat, 0.9); gl.uniform1f(uLight, 0.6)
    gl.uniform1f(uBright, bright)
    gl.uniform1f(uSize, if (inCer) 1.1 else 0.85)
    gl.drawArrays(gl.POINTS, 0, Engine.displayN)
}

private var acc = 0.0
private var uiAcc = 0.0
private var lastNow = 0.0
private var rafStarted = false

private fun frame(nowMs: Double) {
    if (!rafStarted) { lastNow = nowMs; rafStarted = true }
    val dtms = min(50.0, max(0.0, nowMs - lastNow))
    lastNow = nowMs
    val dt = dtms / 1000.0
    acc += dt
    var steps = 0
    while (acc >= 0.1 && steps < 50) {
        pureTick(S, 0.1)
        acc -= 0.1
        steps++
    }
    if (steps == 50) acc = 0.0
    engineFrame(dt)
    uiAcc += dt
    if (uiAcc >= 0.25) {
        uiAcc = 0.0
        refreshUI()
    }
    if (Engine.t > 3.0) E("intro").classList.add("gone")
    win().requestAnimationFrame { n: Double -> frame(n) }
}

fun main() {
    if (!initGl()) return
    val hadSave = loadGame()
    Engine.key = SHAPES[S.shapes].key
    if (Engine.key == "heart") Eng.ensureHeart()
    val cam0 = Engine.cam(Engine.key)
    Engine.camD = cam0.d
    Engine.camEl = cam0.el
    Engine.camSpin = cam0.spin

    /* offline gains */
    if (hadSave) {
        val away = ((win().Date.now() as Double) - S.lastSave) / 1000.0
        if (away > 60.0) {
            val capH = if (S.after > 0) Bal.afterCapsH[S.after - 1] else Bal.baseAfterCapH
            val eff = 0.5 * (if (S.shapes >= 9) 2.0 else 1.0)   // möbius: offline ×2
            val secs = min(away, capH * 3600.0)
            if (secs > 0.0 && S.lastIncome > 0.0) {
                val gain = S.lastIncome * secs * eff
                S.light += gain
                S.runEarned += gain
                S.allEarned += gain
                win().setTimeout({ _: dynamic -> toast("WHILE YOU WERE AWAY · +" + fmt(gain) + " LIGHT") }, 900)
            }
        }
    }

    /* initial formation fill */
    for (i in 0 until MAXN) {
        Eng.shapePos(Engine.key, i, 0.0, Eng.T3)
        val j = i * 3
        Eng.pos[j] = Eng.T3[0]; Eng.pos[j + 1] = Eng.T3[1]; Eng.pos[j + 2] = Eng.T3[2]
    }
    for (k in 0 until MAXN * 3) posF32[k] = Eng.pos[k]

    E("introsub").textContent = "15,000 PARTICLES · A PARTICLE IDLE GAME · BUILT WITH KOTLIN"

    win().addEventListener("resize", { _: dynamic -> resize() })
    resize()

    setupTabs()
    buildSpectrumRows()
    buildShopRows()
    panelShow("swarm")

    E("bp1").addEventListener("click", { _: dynamic -> buyParticles(S, 1); refreshUI(); saveGame() })
    E("bp10").addEventListener("click", { _: dynamic -> buyParticles(S, 10); refreshUI(); saveGame() })
    E("bpMax").addEventListener("click", { _: dynamic -> buyParticles(S, maxParticlesAfford(S.P, S.light)); refreshUI(); saveGame() })
    E("bl1").addEventListener("click", { _: dynamic -> buyLight(S, 1); refreshUI(); saveGame() })
    E("blMax").addEventListener("click", { _: dynamic -> buyLight(S, maxLightAfford(S.L, S.light)); refreshUI(); saveGame() })
    E("saveBtn").addEventListener("click", { _: dynamic -> saveGame(); toast("SAVED") })
    E("wipeBtn").addEventListener("click", { _: dynamic ->
        if (win().confirm("Wipe your swarm? All shapes, prisms and light will be lost.") == true) {
            store().removeItem(SAVE_KEY)
            S = GameState()
            Engine.key = "sphere"
            Engine.cerPhase = -1
            Blend.active = false
            cerOff()
            toast("THE VOID RESETS")
            refreshUI()
            saveGame()
        }
    })
    E("gatherBtn").addEventListener("click", { _: dynamic ->
        if (canGather(S)) {
            val gained = doGather(S)
            val sh = SHAPES[S.shapes]
            if (sh.key == "heart") Eng.ensureHeart()
            Engine.cerKey = sh.key
            Engine.cerPhase = 0
            Engine.cerT = 0.0
            cerOn(sh.name, "GATHERED · " + fmtMult(sh.mult) + " — " + sh.sub)
            toast("+" + fmt(gained.toDouble()) + " PRISMS")
            refreshUI()
            saveGame()
        }
    })
    canvas.addEventListener("pointerdown", { _: dynamic ->
        val inc = incomeOf(S, S.t)
        val gain = max(10.0, inc)   // inspire: +1s of production (min 10)
        S.light += gain
        S.runEarned += gain
        S.allEarned += gain
        Engine.tapGlow = 0.8
    })
    win().addEventListener("visibilitychange", { _: dynamic -> if (doc().hidden == true) saveGame() })
    win().setInterval({ _: dynamic -> saveGame() }, 5000)

    refreshUI()
    win().requestAnimationFrame { n: Double -> frame(n) }
}
