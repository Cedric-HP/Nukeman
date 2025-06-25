import { objColliderChecker, positionBlackListChecker } from "./hit_Box.js"
import { objHpMaxValue, objHpValue } from "./stats.js"
import { hisIndestructible, lastHitByList, objList, objSpecial } from "./utilitys.js"

// Block Id Cycle Checker

const cycleBlockId = () => {
    for (let i = 1; i <= Object.keys(objList).length - objSpecial + 1; i++) {
        let check = true
        for (let obj in objList) {
            if (obj != "#body_1" && obj != "#body_2" && obj == String("#block_"+i)) {
                check = false
                break;
            }
        }
        if (check) {
            return i
        }
    }
}

// Generation Function

export function generation (elementsToGenerate, indest, minSize, maxSize) {
    let sizeSart = Object.keys(objList).length - objSpecial
    let count = 0
    do {
        for (let i = 1; i <= elementsToGenerate; i++) {
            createBlock(elementsToGenerate, indest, minSize, maxSize, count)
            count = (Object.keys(objList).length - objSpecial) - sizeSart
        }
    } while ( count < elementsToGenerate)
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
}

// Create Block Function

const createBlock = (elementsToGenerate, indest, minSize, maxSize, count) => {
    if (count < elementsToGenerate) {

        // Creating base of the block

        let block = document.createElement("div")
        let width = Math.round(Math.floor(minSize + Math.random() * (maxSize - minSize) ))
        let id = cycleBlockId()
        document.getElementById('playground').appendChild(block);
        block.style.width = width + "px";
        block.style.height = width + "px";
        block.style.position = "absolute";
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
            checkposition = positionBlackListChecker(block)
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
        }
        else {
            document.querySelector("#" + String(block.id)).remove()
        }
    } 
}