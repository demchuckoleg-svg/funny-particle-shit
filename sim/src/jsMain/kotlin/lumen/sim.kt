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
        val cP = particleCost(S.P)
        val gainP = if (S.P > 0) inc / S.P else inc
        val pbP = if (gainP > 0.0) cP / gainP else 1e18
        val cL = lightCost(S.L)
        val gainL = 0.25 * inc
        val pbL = if (gainL > 0.0) cL / gainL else 1e18
        var bb = -1
        var cB = Double.MAX_VALUE
        for (b in 0..6) {
            if (S.bands[b] >= Bal.bandMaxLvl) continue
            val c = bandCost(b, S.bands[b])
            if (c < cB) { cB = c; bb = b }
        }
        val gainB = 0.10 * inc
        val pbB = if (bb >= 0 && gainB > 0.0) cB / gainB else 1e18

        var acted = false
        if (pbP <= pbL && pbP <= pbB && cP <= S.light && S.P < Bal.PCAP) {
            buyParticles(S, 1); acted = true
        } else if (pbL <= pbP && pbL <= pbB && cL <= S.light && S.L < Bal.LCAP) {
            buyLight(S, 1); acted = true
        } else if (pbB <= pbP && pbB <= pbL && bb >= 0 && cB <= S.light) {
            buyBand(S, bb); acted = true
        }
        if (!acted) break
        inc = incomeOf(S, S.t)
        buys++
    }
}

private fun spendPrisms(S: GameState) {
    buyAuto(S, "autoP")
    buyAuto(S, "autoL")
    buyAuto(S, "autoS")
    if (S.after < 1) buyShop(S, "after")
    while (S.ref < Bal.refMax && shopCost("ref", S.ref) in 0.0..(S.prisms / 2.0)) buyShop(S, "ref")
    while (S.head < Bal.headMax && shopCost("head", S.head) in 0.0..30.0) buyShop(S, "head")
    if (S.after < 2) buyShop(S, "after")
    if (S.mom < 1) buyShop(S, "mom")
    if (S.after < 3) buyShop(S, "after")
    if (S.mom < 2) buyShop(S, "mom")
    if (S.after < 4) buyShop(S, "after")
    if (S.mom < 3) buyShop(S, "mom")
    while (S.ref < Bal.refMax && shopCost("ref", S.ref) in 0.0..S.prisms.toDouble()) buyShop(S, "ref")
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
