
// Import

import { executeDisplayHpBarre, executeDisplayLevel, executeDisplayRoundKill } from "./display.js"
import { respawnTrigger, regenerationTrigger } from "./playerAtributes.js"
import { hpObjChecker } from "./damage.js"
import { positionBlackListUpdater } from "./utilitys.js"
import { levelUp } from "./levelUp.js"
import { executeMoves } from "./playerMovement.js"
import { moveSpeed } from "./stats.js"

// Execute Animation Function

const animate = () => {
    levelUp()
    positionBlackListUpdater()
    hpObjChecker()
    respawnTrigger()
    regenerationTrigger()
    executeDisplayHpBarre()
    executeDisplayLevel()
    executeDisplayRoundKill()
    window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)

// Execute Movement

executeMoves(moveSpeed.player_1, moveSpeed.player_2)