plugins {
    kotlin("multiplatform")
    application
}

kotlin {
    jvm { withJava() }
    js(IR) {
        browser { }
        binaries.executable()
    }
}

application {
    mainClass.set("lumen.SimKt")
}
