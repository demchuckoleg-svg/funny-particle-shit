# FLUTTERLIGHT — a particle idle game in Kotlin Multiplatform

An idle game built on a 15,000-particle WebGL engine. All the game logic is
**pure Kotlin**, compiled by **GitHub Actions** to two targets:

- `shared/src/commonMain/kotlin/lumen/logic.kt` — the entire game as pure Kotlin
  (costs, production, shapes, prestige, shop, save serialization)
- `shared/src/jsMain/kotlin/lumen/web.kt` — the WebGL particle engine + UI → Kotlin/JS
- `sim/src/main/kotlin/lumen/sim.kt` — a greedy-bot balance simulator (Kotlin/JVM application,
  consumed by CI as a Gradle `:sim:run` task)

Play the CI build: **https://demchuckoleg-svg.github.io/funny-particle-shit/**

## The game

Particles produce **light**. Two upgrade axes bought with light:

- **density** (particle count) — cost `10 × 1.11ⁿ`, the classic exponential generator curve
- **light level** (efficiency) — cost `50 × 2.2ⁿ`, each level ×1.25 per-particle output

More progression layers:

- **spectrum** — seven colour bands × five levels, ×1.10 all production each;
  completing a band grants a free light level; the swarm's hue is your spectrum
- **gather** (prestige) — reforge the swarm into the next shape. The order is
  corners ascending, then abstract topology:
  sphere → triangle (3) → square (4) → pentagon (5) → hexagon (6) → star (10)
  → heart (the cusp) → spiral galaxy (spin) → möbius band (one side)
  → klein bottle (containment) → torus knot (binding) → tesseract (dimension).
  Every shape bonus stacks with all previous ones.
- **prisms** — prestige currency, `⌊cbrt(runEarnings / 1e4)⌋`
  (Cookie Clicker's cube-root convention), spent on refraction, head start,
  afterglow (offline gains), momentum, and three autopilots

Balance follows the standard idle-game math: exponential costs vs linear
production, closed-form bulk-buy/max (geometric series), cube-root prestige
currency. Every CI run prints a greedy-bot pacing table with targets:
first gather ≤ 5 min, worst gap ≤ 10 min, full arc 30 min–2 h.

## CI

`.github/workflows/build.yml` on every push:

1. Gradle builds the playable web bundle (`:shared:jsBrowserProductionWebpack`)
2. Standalone `kotlinc` compiles and runs the JVM balance simulation
3. The bundle is uploaded as an artifact and deployed to the `gh-pages` branch

## Earlier prototypes (plain HTML/JS)

- `particles.html` — interactive tap-to-morph particle toy
- `particle-film.html` — the 40-second cinematic loop, 15,000 particles
- `flutterlight.html` — the first web prototype of this game
