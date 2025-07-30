
import { directionList, objColliderBetween } from "./hit_Box.js";
import { sizeShift } from "./playerAtributes/size_shift.js";
import { invincibility } from "./playerAtributes/invincibility.js";
import { objHpMaxValue, objHpValue } from "./stats.js";
import { generationUtilitises, hisInvincible, objCount, playerIdentifier, playerTimers, playerlist, powerUpObjList } from "./utilitys.js";
import { movementSpeedBoost } from "./playerAtributes/movement_Boost.js";

// powerUp trigger Checker

export function powerUptrigger () {
    playerlist.forEach((player)=> {
        for (let powerUp in powerUpObjList) {
            let check = true
            for (let direction of directionList) {
                if (check) {
                    if (!objColliderBetween(playerIdentifier[player], direction, powerUp)) {
                        console.log(powerUp+"activated")
                        powerUpEffect(player, powerUp)
                        check = false
                    }
                }
            } 
        }
    })
}

// PowerUp Effect

const powerUpEffect = (player, powerUp) => {
    console.log(powerUpObjList[powerUp].type.name)
    switch(powerUpObjList[powerUp].type.name) {

        // Normal PowerUp

        case "movement_speed":
            playerTimers[player].movementSpeedBoost = 500
            movementSpeedBoost(player)
            break;
        case "heal":
            objHpValue[player] = objHpMaxValue[player]
            break;
        case "sizeShift":
                playerTimers[player].sizeShift = 1000
                sizeShift(player)
                break;
        // Powerfull PowerUp

        case "invincibility": 
            hisInvincible[player] = true
            playerTimers[player].invincibility = 500
            invincibility(player)
            break;
    }
    document.querySelector(powerUp).remove()
    delete powerUpObjList[powerUp]
    objCount.powerUp.count --
    generationUtilitises.count3 --
}