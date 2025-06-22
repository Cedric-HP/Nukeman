
// Import

import { executeDisplay, executeDisplayHpBarre } from "./display.js"
import { respawnTrigger } from "./respawn.js"
import { executeMovesPlayer1, executeMovesPlayer2 } from "./playerMovement.js"

// Execute Animation Function

const animate = () => {
    respawnTrigger()
    executeDisplayHpBarre()
    executeMovesPlayer1()
    executeMovesPlayer2()
    executeDisplay()
    window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)