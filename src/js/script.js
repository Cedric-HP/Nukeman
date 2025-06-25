
// Import

import { executeDisplayHpBarre } from "./display.js"
import { respawnTrigger } from "./respawn.js"
import { executeMovesPlayer1, executeMovesPlayer2 } from "./playerMovement.js"
import { hpObjChecker } from "./damage.js"
import { positionBlackListUpdater } from "./utilitys.js"

// Execute Animation Function

const animate = () => {
    positionBlackListUpdater()
    hpObjChecker()
    respawnTrigger()
    executeDisplayHpBarre()
    executeMovesPlayer1()
    executeMovesPlayer2()
    window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)