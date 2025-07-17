import { hitCoolDown, hitCoolDownP1, hitCoolDownP2, regenP1, regenP2 } from "./playerAtributes.js";
import { bombPower, bombTimeSet, coolDownTimeSet, levelCap, maxBomb, objHpMaxValue, playerScore, regenerationStats } from "./stats.js";
import { hasTakeHit, playerlist } from "./utilitys.js";

export function expAdd (player, ammount) {
    playerScore[player].score += Math.round(ammount) * playerScore[player].multiplier
}

export function levelUp () {
    playerlist.forEach( (player) => {
        if (levelCap[playerScore[player].level].cap !== 0) {
            if (playerScore[player].score >= levelCap[playerScore[player].level].cap) {
                playerScore[player].score -= levelCap[playerScore[player].level].cap
                coolDownTimeSet[player] -= levelCap[playerScore[player].level].cooldown
                bombPower[player] += levelCap[playerScore[player].level].bombpower
                playerScore[player].multiplier += levelCap[playerScore[player].level].multi
                maxBomb[player] += levelCap[playerScore[player].level].bombcount
                bombTimeSet[player] += levelCap[playerScore[player].level].bombset
                objHpMaxValue[player] += levelCap[playerScore[player].level].maxHp
                if (player == "player_1") {
                    if (!hasTakeHit[player].inCooldown && regenerationStats[player].hisInRegen)
                        clearInterval(regenP1)
                }
                else {
                    if (!hasTakeHit[player].inCooldown && regenerationStats[player].hisInRegen)
                        clearInterval(regenP2)
                }
                regenerationStats[player].hisInRegen = false
                regenerationStats[player].regenSpeed -= levelCap[playerScore[player].level].regenspeed
                playerScore[player].level ++
            }
        }
    })
}