import { menuUtility, objList, playerIdentifier, playerTimers, square_1, square_2 } from "../utilitys.js"
import { movementSpeed } from "../stats.js"
import { objColliderChecker } from "../hit_Box.js"

// Size Shifting

let countDownSizeShiftP1
let countDownSizeShiftP2
let hisSizeShiftingP1 = false
let hisSizeShiftingP2 = false
let checkIntervalP1
let checkIntervalP2
let waitSizeShiftP1
let waitSizeShiftP2
let hisWaitingSizeShiftingP1 = false
let hisWaitingSizeShiftingP2 = false

export function sizeShift (player) {
    if ( (!hisSizeShiftingP1 && player == "player_1" && !hisWaitingSizeShiftingP1) || (!hisSizeShiftingP2 && player == "player_2" && !hisWaitingSizeShiftingP2) ) {
        let squareX2 = document.createElement("div")
        let width = parseInt(playerIdentifier[player].style.width) + 2
        document.getElementById('playground').appendChild(squareX2);
        squareX2.style.width = ( width * 2 ) + "px"
        squareX2.style.height = ( width * 2 ) + "px"
        squareX2.style.backgroundColor = "rgba(0, 0, 0, 0)"
        squareX2.id = String(player+"_X2")
        squareX2.style.position = "absolute";
        let border = document.createElement("div")
        border.style.width = ( width * 2 - 2) + "px"
        border.style.height = ( width * 2 - 2 ) + "px"
        border.style.animation = "flicker 0.5s infinite both"
        if (player == "player_1")
        border.style.border = "1px dashed blue"
        else border.style.border = "1px dashed red"
        document.getElementById(String(player+"_X2")).appendChild(border);
        let check = false
        if ( player == "player_1") {
            hisWaitingSizeShiftingP1 = true
            waitSizeShiftP1 = setInterval(()=> {
                if (!menuUtility.inPause) {
                    squareX2.style.top = ( parseInt(playerIdentifier[player].style.top) - 
                        ( ( parseInt(squareX2.style.width) - 2 ) / 2) + 
                        ( parseInt(playerIdentifier[player].style.width) / 2) 
                    ) + "px"
                    squareX2.style.left = ( parseInt(playerIdentifier[player].style.left) - 
                        ( ( parseInt(squareX2.style.width) - 2 ) / 2) + 
                        ( parseInt(playerIdentifier[player].style.width) / 2) 
                    ) + "px"
                    if (check) {
                        doSizeShifting(player,squareX2)
                        clearInterval(checkIntervalP1)
                        clearInterval(waitSizeShiftP1)
                        hisWaitingSizeShiftingP1 = false  
                    }
                }
            },movementSpeed[player])
            checkIntervalP1 = setInterval(()=>{
                if (!menuUtility.inPause)
                    check = objColliderChecker(squareX2, "ALL", objList)
            },100)
        }
        else {
            hisWaitingSizeShiftingP2 = true
            waitSizeShiftP2 = setInterval(()=> {
                squareX2.style.top = ( parseInt(playerIdentifier[player].style.top) - 
                    ( ( parseInt(squareX2.style.width) - 2 ) / 2) + 
                    ( parseInt(playerIdentifier[player].style.width) / 2) 
                ) + "px"
                squareX2.style.left = ( parseInt(playerIdentifier[player].style.left) - 
                    ( ( parseInt(squareX2.style.width) - 2 ) / 2) + 
                    ( parseInt(playerIdentifier[player].style.width) / 2) 
                ) + "px"
                if (check) {
                    doSizeShifting(player,squareX2)
                    clearInterval(checkIntervalP2)
                    clearInterval(waitSizeShiftP2)
                    hisWaitingSizeShiftingP2 = false
                }
            },movementSpeed[player])
            checkIntervalP2 = setInterval(()=>{
                check = objColliderChecker(squareX2, "ALL", objList)
            },100)
        }
    }
}

// Size Shift Executor

const doSizeShifting = (player, squareX2) => {
    if (!hisSizeShiftingP1 && player == "player_1") {
        hisSizeShiftingP1 = true
        let width =  parseInt(squareX2.style.width)
        square_1.style.width = (width - 2) + "px"
        square_1.style.height = (width - 2)+ "px"
        square_1.style.top = ( parseInt(squareX2.style.top) + 1) + "px"
        square_1.style.left = ( parseInt(squareX2.style.left) + 1) + "px"
        document.querySelector(String("#"+player+"_X2")).remove()
        countDownSizeShiftP1 = setInterval(() => {
            if(playerTimers[player].sizeShift<= 0) {
                square_1.style.width = 18 + "px"
                square_1.style.height = 18 + "px"
                square_1.style.top =  ( parseInt(square_1.style.top) + 
                    ( width / 2) - 
                    ( parseInt(square_1.style.width) / 2) 
                    ) + "px"
                    square_1.style.left =  ( parseInt(square_1.style.left) + 
                    ( width / 2) - 
                    ( parseInt(square_1.style.width) / 2) 
                    ) + "px"
                
                clearInterval(countDownSizeShiftP1)
                hisSizeShiftingP1 = false
            }
            if (!menuUtility.inPause)
                playerTimers[player].sizeShift -= 1
        }, "10")
    }
    else if (!hisSizeShiftingP2 && player == "player_2") {
        hisSizeShiftingP2 = true
        let width =  parseInt(squareX2.style.width)
        square_2.style.width = (width - 2) + "px"
        square_2.style.height = (width - 2)+ "px"
        square_2.style.top = ( parseInt(squareX2.style.top) + 1) + "px"
        square_2.style.left = ( parseInt(squareX2.style.left) + 1)+ "px"
        document.querySelector(String("#"+player+"_X2")).remove()
        countDownSizeShiftP2 = setInterval(() => {
            if(playerTimers[player].sizeShift <= 0) {
                square_2.style.width = 18 + "px"
                square_2.style.height = 18 + "px"
                square_2.style.top =  ( parseInt(square_2.style.top) + 
                    ( width / 2) - 
                    ( parseInt(square_2.style.width) / 2) 
                    ) + "px"
                    square_2.style.left =  ( parseInt(square_2.style.left) + 
                    ( width / 2) - 
                    ( parseInt(square_2.style.width) / 2) 
                    ) + "px"
                clearInterval(countDownSizeShiftP2)
                hisSizeShiftingP2 = false
            }
            if (!menuUtility.inPause)
                playerTimers[player].sizeShift -= 1
        }, "10")
    }
}