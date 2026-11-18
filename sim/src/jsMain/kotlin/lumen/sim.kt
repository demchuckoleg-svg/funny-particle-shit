package lumen

import kotlin.math.max

/* ============================================================
   Balance simulation — a greedy payback-minimizing bot plays the
   game to the Tesseract and prints a pacing table. Runs on the
   JVM inside GitHub Actions on every push.
   ============================================================ */

private fun mmss(t: Double): String {
    val total = t.toInt()
    val h = total / 3600
    val m = (total % 3600) / 60
    val s = total % 60
    return (if (h > 0) h.toString() + "h " else "") +
        m.toString().padStart(2, '0') + "m " + s.toString().padStart(2, '0') + "s"
}

private fun greedyBuy(S: GameState) {
    var inc = incomeOf(S, S.t)
    var buys = 0
    while (buys < 500) {
        var bestPb = Double.MAX_VALUE
        var kind = -1
        var bandIdx = -1

        val cP = particleCost(S.P)
        if (S.P < Bal.PCAP && cP <= S.light) {
            val gainP = if (S.P > 0) inc / S.P else inc
            if (gainP > 0.0) { val pb = cP / gainP; if (pb < bestPb) { bestPb = pb; kind = 0 } }
        }
        val cL = lightCost(S.L)
        if (S.L < Bal.LCAP && cL <= S.light) {
            val gainL = 0.25 * inc
            if (gainL > 0.0) { val pb = cL / gainL; if (pb < bestPb) { bestPb = pb; kind = 1 } }
        }
        var bestBandCost = Double.MAX_VALUE
        for (b in 0..6) {
            if (S.bands[b] >= Bal.bandMaxLvl) continue
            val c = bandCost(b, S.bands[b])
            if (c < bestBandCost) { bestBandCost = c; bandIdx = b }
        }
        if (bandIdx >= 0 && bestBandCost <= S.light) {
            val gainB = 0.10 * inc
            if (gainB > 0.0) { val pb = bestBandCost / gainB; if (pb < bestPb) { bestPb = pb; kind = 2 } }
        }

        when (kind) {
            0 -> buyParticles(S, 1)
            1 -> buyLight(S, 1)
            2 -> buyBand(S, bandIdx)
        }
        if (kind < 0) break
        inc = incomeOf(S, S.t)
        buys++
    }
}

/* buy repeatedly while the next level is affordable within maxCost — always terminates */
private fun buyWhile(S: GameState, kind: String, maxCost: Double) {
    while (true) {
        val lvl = when (kind) {
            "ref" -> S.ref
            "head" -> S.head
            "after" -> S.after
            "mom" -> S.mom
            else -> return
        }
        val c = shopCost(kind, lvl)
        if (c < 0.0 || c > maxCost || c > S.prisms) return
        if (!buyShop(S, kind)) return
    }
}

private fun spendPrisms(S: GameState) {
    buyAuto(S, "autoP")
    buyAuto(S, "autoL")
    buyAuto(S, "autoS")
    if (S.after < 1) buyShop(S, "after")
    buyWhile(S, "ref", S.prisms / 2.0)
    buyWhile(S, "head", 30.0)
    if (S.after < 2) buyShop(S, "after")
    if (S.mom < 1) buyShop(S, "mom")
    if (S.after < 3) buyShop(S, "after")
    if (S.mom < 2) buyShop(S, "mom")
    if (S.after < 4) buyShop(S, "after")
    if (S.mom < 3) buyShop(S, "mom")
    buyWhile(S, "ref", S.prisms.toDouble())
}

/* a wall-clock helper for node (JS-only source set) */
private fun nowMs(): Double = js("Date.now()")

fun main() {
    val S = GameState()
    var t = 0.0
    val dt = 1.0
    val horizon = 6.0 * 3600.0
    val names = ArrayList<String>()
    val times = ArrayList<Double>()
    val prismsAt = ArrayList<Int>()
    val incomeAt = ArrayList<Double>()
    val wallStart = nowMs()

    while (t < horizon) {
        S.t = t
        val inc = incomeOf(S, S.t)
        S.light += inc * dt
        S.runEarned += inc * dt
        S.allEarned += inc * dt
        greedyBuy(S)
        if (canGather(S)) {
            val wasComplete = S.shapes >= SHAPES.size - 1
            doGather(S)
            spendPrisms(S)
            names.add(if (wasComplete) "REFINEMENT" else SHAPES[S.shapes].name)
            times.add(t)
            prismsAt.add(S.prisms)
            incomeAt.add(incomeOf(S, S.t))
            if (S.shapes >= SHAPES.size - 1 && !wasComplete) break
        }
        t += dt
    }
    val wallMs = (nowMs() - wallStart).toInt()

    println("=== FLUTTERLIGHT balance simulation (greedy bot, 1 s ticks) ===")
    println()
    var prev = 0.0
    var worstDelta = 0.0
    for (i in names.indices) {
        val d = times[i] - prev
        if (d > worstDelta) worstDelta = d
        println(
            (names[i] + " ").padEnd(17) +
                "unlocked " + mmss(times[i]).padEnd(11) +
                "gap " + mmss(d).padEnd(11) +
                "income " + (fmt(incomeAt[i]) + "/s").padStart(10) +
                "   prisms " + prismsAt[i]
        )
        prev = times[i]
    }
    val complete = S.shapes >= SHAPES.size - 1
    println()
    println("simulated to " + mmss(t) + " in " + wallMs + " ms wall-clock · " + S.totalGathers + " gathers")
    if (!complete) println("!! did not reach the TESSERACT within 6 h — curve too steep")
    println()
    val first = if (times.isNotEmpty()) times[0] else 1e18
    val arc = if (times.isNotEmpty()) times[times.size - 1] else 0.0
    val avgGap = if (times.isNotEmpty()) arc / max(1, times.size) else 1e18
    println("first gather : " + mmss(first) + "   (target <= 5m)")
    println("worst gap    : " + mmss(worstDelta) + "   (target <= 10m)")
    println("avg gap      : " + mmss(avgGap))
    println("full arc     : " + mmss(arc) + "   (target 30m-2h)")
    val ok = complete && first <= 300.0 && worstDelta <= 600.0 && arc in 1800.0..7200.0
    println()
    println(if (ok) "BALANCE: OK" else "BALANCE: NEEDS TUNING (see targets above)")
}
