
import { objColliderChecker, positionBlackListChecker } from "./hit_Box.js";
import { powerUpList } from "./stats.js";
import { powerUpObjList, objCount, hisIndestructible, objList, positionBlackList, generationUtilitises, menuUtility } from "./utilitys.js";

export { powerUpGenInterval, generationPowerUpTimeOut, isWaitingGenerationPowerUp }

// PowerUp Id Cycle Checker

const cyclePowerUpId = () => {
    for (let i = 1; i <= objCount.powerUp.count + 1; i++) {
        let check = true
        for (let obj in powerUpObjList) {
            if (String(obj) == String("#powerUp_"+i)) {
                check = false
                break;
            }
        }
        if (check) {
            return i
        }
    }
}

// Remove PowerUp

export function removePowerUp () {
    for (let item in powerUpObjList) {
        document.querySelector(item).remove()
        delete powerUpObjList[item]
    }
    objCount.powerUp.count = 0
    generationUtilitises.count3 = 0
}

// Generate Interval PowerUp

let powerUpGenInterval

export function generateIntervalPowerUp (spawntAt, power, rate) {
    if (!generationUtilitises.hisGenIntervalPowerUp) {
        generationUtilitises.hisGenIntervalPowerUp = true
        let interval = Math.round(rate * 100)
        let timer = interval
        powerUpGenInterval = setInterval(()=> {
            if(!menuUtility.inPause)
                timer--
            if(timer <= 0) {
                creatPowerUp(spawntAt, power, 1, 0)
                timer = interval
            }
        }, 10)
    }
}

// Generate PowerUp

let generationPowerUpTimeOut
let isWaitingGenerationPowerUp = false

export function generatePowerUp (elementToGenerate, timeOut) {
    isWaitingGenerationPowerUp = true
    generationPowerUpTimeOut = setTimeout(()=>{
        isWaitingGenerationPowerUp = false
        const looper = (elementToGenerate) => {
            for (let i = generationUtilitises.count3; i < elementToGenerate; i++) {
                creatPowerUp("block", "normal", elementToGenerate, generationUtilitises.count3)
            }
            if(generationUtilitises.count3 < elementToGenerate)
                looper(elementToGenerate)
        }
        looper(elementToGenerate)
    }, (timeOut * 1000))
}

// Create PowerUp

export function creatPowerUp (spawnAt, power, elementsToGenerate, countUtile) {
    if (countUtile < elementsToGenerate && objCount.powerUp.count < objCount.powerUp.max) {
        let powerUp = document.createElement("div")
        let id = cyclePowerUpId()
        let width = 20
        document.getElementById('playground').appendChild(powerUp);
        powerUp.style.width = width + "px"
        powerUp.style.height = width + "px"
        powerUp.style.position = "absolute";
        powerUp.id = "powerUp_" + String(id);
        powerUp.style.zIndex = -1
        let checkposition = false
        let checkcolide = false
        let count = 0
        let blockToBind

        // Position Checks

        // Position for Block generation

        if (spawnAt == "block") {
            checkcolide = true
            do {
                blockToBind = "#block_"+ String( Math.floor( 1 + Math.random() * (objCount.block.count - 1) ) )
                if (!hisIndestructible[objList[blockToBind]]) {
                    if (powerUpObjList == {}) {
                        checkposition = true
                    }
                    else {
                        checkposition = true
                        for (let item in powerUpObjList) {
                            if (item.bindTo == blockToBind)
                                checkposition = false
                        }
                    }
                }
                count++
            } while (!checkposition && count < objCount.block.count)
            if (checkposition) {
                powerUp.style.top = ( parseInt(document.querySelector(blockToBind).style.top) + ( parseInt(document.querySelector(blockToBind).style.height) / 2 ) - ( parseInt(powerUp.style.width)/2 ) ) + "px"
                powerUp.style.left = ( parseInt(document.querySelector(blockToBind).style.left) + ( parseInt(document.querySelector(blockToBind).style.width) / 2 ) - ( parseInt(powerUp.style.width)/2 ) ) + "px"
            }
        }

        // Position for Special zone generation

        else {
            blockToBind = "none"
            do {
                powerUp.style.top = positionBlackList[spawnAt][1] + Math.round(Math.floor(0 + Math.random() * (positionBlackList[spawnAt][3] - parseInt(powerUp.style.width) ))) + "px"
                powerUp.style.left = positionBlackList[spawnAt][0] + Math.round(Math.floor(0 + Math.random() * (positionBlackList[spawnAt][2] - parseInt(powerUp.style.width) ))) + "px"
                checkposition = !positionBlackListChecker(powerUp, spawnAt)
                checkcolide = objColliderChecker(powerUp, "ALL", powerUpObjList)
                count++
            }while (!checkposition && !checkcolide && count < 1000)
        }

        // If Position is checked

        if (checkposition && checkcolide) {
            powerUpObjList["#"+ String(powerUp.id)] = {
                bindTo: blockToBind,
                type: powerUpList[power][Math.floor( Math.random() * (powerUpList[power].length))]
            }
            // console.log(powerUpObjList["#"+ String(powerUp.id)])
            powerUp.style.backgroundColor = powerUpObjList["#"+ String(powerUp.id)].type.color
            powerUp.style.animation = "appearance 0.2s 1"
            objCount.powerUp.count ++
            generationUtilitises.count3 ++
        }   
        else {
            document.querySelector("#" + String(powerUp.id)).remove()
        }
    }
}