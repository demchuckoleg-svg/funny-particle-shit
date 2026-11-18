package lumen

import kotlin.math.floor
import kotlin.math.log10
import kotlin.math.pow
import kotlin.math.roundToInt

/* ============================================================
   FLUTTERLIGHT — pure game logic (compiled to both JVM and JS).

   Balance conventions:
   - exponential generator costs vs linear production (the classic
     idle-game seesaw; cost = base * rate^owned)
   - closed-form bulk-buy / max-affordable via geometric series
   - cube-root prestige currency (the Cookie Clicker convention)
   - shape bonuses stack multiplicatively; the requirement for the
     next shape scales with the product of all previous bonuses,
     so each gather stays a similar relative effort
   ============================================================ */

object Bal {
    const val P0 = 10
    const val perParticle = 1.0
    const val pCostBase = 10.0
    const val pCostRate = 1.11
    const val lCostBase = 50.0
    const val lCostRate = 2.2
    const val lGain = 1.25
    const val bandBase = 400.0
    const val bandLvlRate = 2.5
    const val bandGain = 1.10
    const val bandMaxLvl = 5
    const val prismsDiv = 1e4
    const val reqBase = 3e4
    /* requirement exponent: the bot's equilibrium income grows ~mult^1.39
       (density x efficiency compounding), so the next shape's requirement
       must scale as mult^reqExp to keep every gather a similar effort */
    const val reqExp = 1.4
    const val refBase = 5
    const val refGain = 1.25
    const val refMax = 60
    const val headBase = 5
    const val headMax = 20
    const val headGain = 25
    val afterCosts = intArrayOf(10, 30, 90, 270)
    val afterCapsH = doubleArrayOf(2.0, 8.0, 24.0, Double.POSITIVE_INFINITY)
    const val baseAfterCapH = 0.5
    const val autoP = 25
    const val autoL = 75
    const val autoS = 225
    val momCosts = intArrayOf(50, 150, 450)
    const val momRate = 0.02
    val momCaps = doubleArrayOf(1.0, 3.0, 10.0)
    const val PCAP = 6000
    const val LCAP = 300
}

/* shapes: corners ascending, then abstract topology */
data class Shape(val key: String, val name: String, val sub: String, val mult: Double)

val SHAPES = listOf(
    Shape("sphere", "FORMLESS SPHERE", "zero corners · pure potential", 1.0),
    Shape("tri", "TRIANGLE", "3 corners · STABILITY", 3.0),
    Shape("square", "SQUARE", "4 corners · FOUNDATION", 5.0),
    Shape("pent", "PENTAGON", "5 corners · the golden ratio lives here", 8.0),
    Shape("hex", "HEXAGON", "6 corners · nature's lattice", 13.0),
    Shape("star", "STAR", "10 corners · RADIANCE", 25.0),
    Shape("heart", "HEART", "abstract: the cusp · PULSE", 50.0),
    Shape("galaxy", "SPIRAL GALAXY", "abstract: angular momentum", 120.0),
    Shape("mobius", "MÖBIUS BAND", "abstract: one side · offline gains ×2", 350.0),
    Shape("klein", "KLEIN BOTTLE", "abstract: contained infinity", 1000.0),
    Shape("knot", "TORUS KNOT", "abstract: knottedness · BINDING", 4000.0),
    Shape("tesseract", "TESSERACT", "abstract: the fourth dimension", 20000.0),
)

class GameState {
    var light = 0.0
    var runEarned = 0.0
    var allEarned = 0.0
    var P = Bal.P0
    var L = 0
    var bands = IntArray(7)
    var shapes = 0
    var prisms = 0
    var ref = 0
    var head = 0
    var after = 0
    var mom = 0
    var autoP = false
    var autoL = false
    var autoS = false
    var t = 0.0
    var gatherT = 0.0
    var lastSave = 0.0
    var lastIncome = 0.0
    var totalGathers = 0
}

/* ---------- costs ---------- */

fun particleCost(P: Int): Double = Bal.pCostBase * Bal.pCostRate.pow(P)
fun lightCost(L: Int): Double = Bal.lCostBase * Bal.lCostRate.pow(L)
fun bandCost(b: Int, l: Int): Double = Bal.bandBase * 10.0.pow(b) * Bal.bandLvlRate.pow(l)

fun bulkParticleCost(P: Int, n: Int): Double {
    val r = Bal.pCostRate
    return Bal.pCostBase * r.pow(P) * (r.pow(n) - 1.0) / (r - 1.0)
}

fun bulkLightCost(L: Int, n: Int): Double {
    val r = Bal.lCostRate
    return Bal.lCostBase * r.pow(L) * (r.pow(n) - 1.0) / (r - 1.0)
}

fun maxParticlesAfford(P: Int, light: Double): Int {
    val r = Bal.pCostRate
    val b = Bal.pCostBase
    val c = light * (r - 1.0) / (b * r.pow(P)) + 1.0
    if (c <= 1.0) return 0
    var n = (log10(c) / log10(r)).toInt()
    if (n > Bal.PCAP - P) n = Bal.PCAP - P
    if (n < 0) n = 0
    while (n > 0 && bulkParticleCost(P, n) > light) n--
    while (n + 1 <= Bal.PCAP - P && bulkParticleCost(P, n + 1) <= light) n++
    return n
}

fun maxLightAfford(L: Int, light: Double): Int {
    val r = Bal.lCostRate
    val b = Bal.lCostBase
    val c = light * (r - 1.0) / (b * r.pow(L)) + 1.0
    if (c <= 1.0) return 0
    var n = (log10(c) / log10(r)).toInt()
    if (n > Bal.LCAP - L) n = Bal.LCAP - L
    if (n < 0) n = 0
    while (n > 0 && bulkLightCost(L, n) > light) n--
    while (n + 1 <= Bal.LCAP - L && bulkLightCost(L, n + 1) <= light) n++
    return n
}

/* ---------- production ---------- */

fun shapeMult(shapesOwned: Int): Double {
    var m = 1.0
    for (k in 1..shapesOwned) m *= SHAPES[k].mult
    return m
}

fun spectrumMult(bands: IntArray): Double {
    var s = 0
    for (b in bands) s += b
    return Bal.bandGain.pow(s)
}

fun prismMult(refLvl: Int): Double = Bal.refGain.pow(refLvl)

fun momentumMult(S: GameState, tNow: Double): Double {
    if (S.mom <= 0) return 1.0
    val mins = (tNow - S.gatherT) / 60.0
    val cap = Bal.momCaps[S.mom - 1]
    return 1.0 + Bal.momRate * (if (mins < cap) mins else cap)
}

fun incomeOf(S: GameState, tNow: Double): Double =
    S.P * Bal.perParticle *
        Bal.lGain.pow(S.L) *
        shapeMult(S.shapes) *
        spectrumMult(S.bands) *
        prismMult(S.ref) *
        momentumMult(S, tNow)

/* requirement to unlock the NEXT shape = reqBase * product(owned shape bonuses)^reqExp */
fun reqFor(shapesOwned: Int): Double {
    val last = SHAPES.size - 1
    return if (shapesOwned >= last) {
        val over = shapesOwned - last + 1
        Bal.reqBase * shapeMult(last).pow(Bal.reqExp) * 10.0.pow(over)
    } else {
        Bal.reqBase * shapeMult(shapesOwned).pow(Bal.reqExp)
    }
}

/* exact integer floor cube root (pow alone can miss exact cubes) */
fun intCubeRoot(v: Double): Int {
    if (v < 1.0) return 0
    var k = v.pow(1.0 / 3.0).toInt()
    if (k < 1) k = 1
    while (k > 1 && k.toDouble() * k * k > v) k--
    while ((k + 1).toDouble() * (k + 1) * (k + 1) <= v) k++
    return k
}

fun prismsFor(runEarned: Double): Int = intCubeRoot(runEarned / Bal.prismsDiv)

/* ---------- purchases ---------- */

fun buyParticles(S: GameState, n: Int): Int {
    var want = n
    val room = Bal.PCAP - S.P
    if (want > room) want = room
    if (want <= 0) return 0
    var c = bulkParticleCost(S.P, want)
    if (S.light < c) {
        want = maxParticlesAfford(S.P, S.light)
        if (want <= 0) return 0
        c = bulkParticleCost(S.P, want)
    }
    S.light -= c
    S.P += want
    return want
}

fun buyLight(S: GameState, n: Int): Int {
    var want = n
    val room = Bal.LCAP - S.L
    if (want > room) want = room
    if (want <= 0) return 0
    var c = bulkLightCost(S.L, want)
    if (S.light < c) {
        want = maxLightAfford(S.L, S.light)
        if (want <= 0) return 0
        c = bulkLightCost(S.L, want)
    }
    S.light -= c
    S.L += want
    return want
}

/* returns 0 = too expensive, 1 = bought, 2 = bought + chromatic resonance */
fun buyBand(S: GameState, b: Int): Int {
    val l = S.bands[b]
    if (l >= Bal.bandMaxLvl) return 0
    val c = bandCost(b, l)
    if (S.light < c) return 0
    S.light -= c
    S.bands[b] = l + 1
    if (S.bands[b] == Bal.bandMaxLvl) {
        if (S.L < Bal.LCAP) S.L++
        return 2
    }
    return 1
}

fun canGather(S: GameState): Boolean = S.runEarned >= reqFor(S.shapes)

/* the prestige: reforge the swarm into the next shape; returns prisms gained */
fun doGather(S: GameState): Int {
    if (!canGather(S)) return -1
    val gained = prismsFor(S.runEarned)
    S.prisms += gained
    val wasComplete = S.shapes >= SHAPES.size - 1
    if (!wasComplete) S.shapes++
    S.totalGathers++
    S.light = 0.0
    S.runEarned = 0.0
    S.P = Bal.P0 + Bal.headGain * S.head
    S.L = 0
    for (i in S.bands.indices) S.bands[i] = 0
    S.gatherT = S.t
    return gained
}

/* ---------- prism shop ---------- */

fun shopCost(kind: String, lvl: Int): Double = when (kind) {
    "ref" -> if (lvl >= Bal.refMax) -1.0 else Bal.refBase * 2.0.pow(lvl)
    "head" -> if (lvl >= Bal.headMax) -1.0 else Bal.headBase * 2.0.pow(lvl)
    "after" -> if (lvl >= Bal.afterCosts.size) -1.0 else Bal.afterCosts[lvl].toDouble()
    "mom" -> if (lvl >= Bal.momCosts.size) -1.0 else Bal.momCosts[lvl].toDouble()
    else -> -1.0
}

fun buyShop(S: GameState, kind: String): Boolean {
    val lvl = when (kind) {
        "ref" -> S.ref
        "head" -> S.head
        "after" -> S.after
        "mom" -> S.mom
        else -> return false
    }
    val c = shopCost(kind, lvl)
    if (c < 0.0 || S.prisms < c) return false
    S.prisms -= c.toInt()
    when (kind) {
        "ref" -> S.ref++
        "head" -> S.head++
        "after" -> S.after++
        "mom" -> S.mom++
    }
    return true
}

fun buyAuto(S: GameState, kind: String): Boolean {
    val c = when (kind) {
        "autoP" -> Bal.autoP
        "autoL" -> Bal.autoL
        "autoS" -> Bal.autoS
        else -> return false
    }
    val owned = when (kind) {
        "autoP" -> S.autoP
        "autoL" -> S.autoL
        "autoS" -> S.autoS
        else -> return false
    }
    if (owned || S.prisms < c) return false
    S.prisms -= c
    when (kind) {
        "autoP" -> S.autoP = true
        "autoL" -> S.autoL = true
        "autoS" -> S.autoS = true
    }
    return true
}

/* ---------- fixed-step game tick: income + autopilots ---------- */

fun pureTick(S: GameState, dt: Double) {
    S.t += dt
    val inc = incomeOf(S, S.t)
    S.light += inc * dt
    S.runEarned += inc * dt
    S.allEarned += inc * dt
    if (S.autoP) {
        var g = 0
        while (g < 200 && S.P < Bal.PCAP && particleCost(S.P) <= inc * 15.0) {
            if (buyParticles(S, 1) == 0) break
            g++
        }
    }
    if (S.autoL) {
        var g = 0
        while (g < 200 && S.L < Bal.LCAP && lightCost(S.L) <= inc * 30.0) {
            if (buyLight(S, 1) == 0) break
            g++
        }
    }
    if (S.autoS) {
        var g = 0
        while (g < 60) {
            var bb = -1
            var bc = Double.MAX_VALUE
            for (b in 0..6) {
                val l = S.bands[b]
                if (l >= Bal.bandMaxLvl) continue
                val c = bandCost(b, l)
                if (c < bc) { bc = c; bb = b }
            }
            if (bb < 0 || bc > inc * 60.0) break
            if (buyBand(S, bb) == 0) break
            g++
        }
    }
}

/* ---------- save format ---------- */

fun serialize(S: GameState): String {
    val sb = StringBuilder("v1")
    sb.append('|').append(S.light).append('|').append(S.runEarned).append('|').append(S.allEarned)
    sb.append('|').append(S.P).append('|').append(S.L).append('|')
    for (i in 0..6) { sb.append(S.bands[i]); if (i < 6) sb.append(',') }
    sb.append('|').append(S.shapes).append('|').append(S.prisms).append('|').append(S.ref)
    sb.append('|').append(S.head).append('|').append(S.after).append('|').append(S.mom)
    sb.append('|').append(if (S.autoP) 1 else 0).append('|').append(if (S.autoL) 1 else 0)
    sb.append('|').append(if (S.autoS) 1 else 0)
    sb.append('|').append(S.t).append('|').append(S.gatherT).append('|').append(S.lastSave)
    sb.append('|').append(S.lastIncome).append('|').append(S.totalGathers)
    return sb.toString()
}

fun deserialize(raw: String): GameState? {
    if (!raw.startsWith("v1|")) return null
    val f = raw.split("|")
    if (f.size < 21) return null
    return try {
        val S = GameState()
        S.light = f[1].toDouble()
        S.runEarned = f[2].toDouble()
        S.allEarned = f[3].toDouble()
        S.P = f[4].toInt()
        S.L = f[5].toInt()
        val bs = f[6].split(",")
        for (i in 0..6) S.bands[i] = if (i < bs.size) bs[i].toInt() else 0
        S.shapes = f[7].toInt()
        S.prisms = f[8].toInt()
        S.ref = f[9].toInt()
        S.head = f[10].toInt()
        S.after = f[11].toInt()
        S.mom = f[12].toInt()
        S.autoP = f[13] == "1"
        S.autoL = f[14] == "1"
        S.autoS = f[15] == "1"
        S.t = f[16].toDouble()
        S.gatherT = f[17].toDouble()
        S.lastSave = f[18].toDouble()
        S.lastIncome = f[19].toDouble()
        S.totalGathers = f[20].toInt()
        S
    } catch (e: Exception) {
        null
    }
}

/* ---------- number formatting ---------- */

private val SUF = listOf(
    "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc",
    "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc", "Vg",
    "UVg", "DVg", "TVg", "QaVg"
)

private fun trim1(x: Double): String {
    val t = (x * 10.0).roundToInt()
    return (t / 10).toString() + "." + (t % 10).toString()
}

private fun trim2(x: Double): String {
    val t = (x * 100.0).roundToInt()
    return (t / 100).toString() + "." + ((t % 100) / 10).toString() + (t % 10).toString()
}

fun fmt(n: Double): String {
    if (n.isInfinite()) return "∞"
    if (n.isNaN()) return "?"
    if (n < 0) return "-" + fmt(-n)
    if (n < 1000) {
        if (n < 10 && n != floor(n)) return trim1(n)
        return n.toInt().toString()
    }
    val e = (log10(n) / 3.0).toInt()
    if (e >= SUF.size) {
        val ex = log10(n).toInt()
        val m = n / 10.0.pow(ex)
        return trim2(m) + "e" + ex
    }
    val m = n / 1000.0.pow(e)
    return if (m >= 100.0) m.toInt().toString() + SUF[e]
    else if (m >= 10.0) trim1(m) + SUF[e]
    else trim2(m) + SUF[e]
}

fun fmtMult(n: Double): String = when {
    n < 10.0 -> "×" + trim2(n)
    n < 1000.0 -> "×" + trim1(n)
    else -> "×" + fmt(n)
}
