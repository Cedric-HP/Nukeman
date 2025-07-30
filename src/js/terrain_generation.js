import { objColliderChecker, positionBlackListChecker } from "./hit_Box.js"
import { objHpMaxValue, objHpValue } from "./stats.js"
import { generationUtilitises, hisIndestructible, lastHitByList, objList, objCount } from "./utilitys.js"

// Block Id Cycle Checker

const cycleBlockId = () => {
    for (let i = 1; i <= objCount.block.count + 1; i++) {
        let check = true
        for (let obj in objList) {
            if (obj == String("#block_"+i)) {
                check = false
                break;
            }
        }
        if (check) {
            return i
        }
    }
}

// Generation Timer

let timer

export function generationTimer ( time ) {
    generationUtilitises.timeLeft = true
    timer = setTimeout( () => {
        generationUtilitises.timeLeft = false
        generationUtilitises.isGenerating = false
        generationUtilitises.finish = 0
        removeHiddenClass()
    }, (time * 1000) )
}

// Remove Hidden Class From Blocks

const removeHiddenClass = () => {
    const blocks = document.querySelectorAll(".hidden")
    blocks.forEach( (block) => {
        block.classList.remove("hidden")
        block.style.animation = "appearance 0.2s 1"
    })
}

// Generation Function

export function generation (elementsToGenerate, indest, minSize, maxSize, count) {
    const looper = (elementsToGenerate, indest, minSize, maxSize, count) => {
        setTimeout(() => {
            for (let i = 1; i <= elementsToGenerate; i++) {
                createBlock(elementsToGenerate, indest, minSize, maxSize, generationUtilitises[count], count)
            }
            if (generationUtilitises[count] < elementsToGenerate && generationUtilitises.timeLeft) {
                looper(elementsToGenerate, indest, minSize, maxSize, count)
            }
            else if ( generationUtilitises[count] == elementsToGenerate ) {
                generationUtilitises.finish ++
                if (generationUtilitises.finish == generationUtilitises.executed) {
                    clearTimeout(timer)
                    removeHiddenClass()
                    generationUtilitises.timeLeft = false
                    generationUtilitises.isGenerating = false
                    generationUtilitises.finish = 0
                }
            }
        }, 0);
    }
    looper(elementsToGenerate, indest, minSize, maxSize, count)
}





// Remove All Block Function

export function removeBlock () {
    for (let item in objList) {
        if (item !== "#body_1" && item !== "#body_2") {
            document.querySelector(item).remove()
            delete hisIndestructible[objList[item]]
            delete objHpValue[objList[item]]
            delete lastHitByList[objList[item]]
            delete objList[item]
        }
    }
    objCount.block.count = 0
    generationUtilitises.count1 = 0
    generationUtilitises.count2 = 0
}

// Create Block Function

const createBlock = (elementsToGenerate, indest, minSize, maxSize, count, countId) => {
    if (count < elementsToGenerate && objCount.block.count < objCount.block.max) {

        // Creating base of the block

        let block = document.createElement("div")
        let width = Math.round(Math.floor(minSize + Math.random() * (maxSize - minSize) ))
        let id = cycleBlockId()
        document.getElementById('playground').appendChild(block);
        block.style.width = width + "px";
        block.style.height = width + "px";
        block.style.position = "absolute";
        block.classList.add("hidden")
        block.classList.add("block")
        if (indest) {
            block.style.backgroundColor = "lightslategray";
        }
        else {
            block.style.backgroundColor = "darkgrey";
        }
        block.id = "block_" + String(id);
        let checkcolide = false
        let checkposition = false
        let testcount = 1

        // Testing a random position

        do {
            block.style.top = Math.round(Math.floor(0 + Math.random() * (parseInt(playground.height) - width))) + "px"
            block.style.left = Math.round(Math.floor(0 + Math.random() * (parseInt(playground.width) - width))) + "px"
            checkcolide = objColliderChecker(block, "ALL", objList)
            checkposition = positionBlackListChecker(block, "ALL")
            if (testcount % 100 == 0) {
                width = Math.round( width / 2) + 20
                block.style.width = width + "px";
                block.style.height = width + "px";
            }
            testcount ++
        } while ( !checkcolide && !checkposition && testcount < 1000 );

        // If the position is valide after 1000 try -> then add the block | Else remove it

        if (checkcolide && checkposition) {
            objList["#" + String(block.id)] = String(block.id)
            objHpValue[objList["#" + String(block.id)]] = 50 * (width / 20)
            objHpMaxValue[objList["#" + String(block.id)]] = objHpValue[objList["#" + String(block.id)]]
            hisIndestructible[objList["#" + String(block.id)]] = indest
            lastHitByList[objList["#" + String(block.id)]] = ""
            generationUtilitises[countId] ++
            objCount.block.count ++
        }
        else {
            document.querySelector("#" + String(block.id)).remove()
        }
    } 
}