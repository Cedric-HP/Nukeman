
// Import

import { executeDisplayHpBarre, executeDisplayLevel, executeDisplayRoundKill } from "./display.js"
import { hpObjChecker } from "./damage.js"
import { positionBlackListUpdater } from "./utilitys.js"
import { levelUp } from "./levelUp.js"
import { powerUptrigger } from "./powerUp_effect.js"
import { respawnTrigger } from "./playerAtributes/respawn.js"
import { regenerationTrigger } from "./playerAtributes/regeneration.js"

// Execute Animation Function

const animate = () => {
    powerUptrigger()
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