
// Import

import { square_1, square_2, objList } from "./utilitys.js"
import { bombList } from "./utilitys.js"

// Variables

const directionList = ["UP", "DOWN", "LEFT", "RIGHT"]

// Universal Hit-Box Checker

const hitBoxchecker = (direction, xObj_1, yObj_1, sizeObj1, xObj_2, yObj_2, sizeObj2) => {
    switch(direction) {
        case "UP":
            if( ( yObj_1 - yObj_2 <= sizeObj2 && yObj_1 - yObj_2 > -sizeObj1 ) && ( xObj_1 - xObj_2 < sizeObj2 && xObj_1 - xObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "DOWN":
            if( ( yObj_2 - yObj_1 <= sizeObj1 && yObj_2 - yObj_1 > -sizeObj2 ) && (xObj_1 - xObj_2 < sizeObj2 && xObj_1 - xObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "LEFT":
            if( ( xObj_1 - xObj_2 <= sizeObj2 && xObj_1 - xObj_2 > -sizeObj1 ) && (yObj_1 - yObj_2 < sizeObj2 && yObj_1 - yObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "RIGHT":
            if( (xObj_2 - xObj_1 <= sizeObj1 && xObj_2 - xObj_1 > -sizeObj2) && (yObj_1 - yObj_2 < sizeObj2 && yObj_1 - yObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break; 
    }
}

// Objects Collider

export function objColliderChecker (obj, direction) {
    const objListed = objList
    for (let objTested of objListed) {
        if (obj != document.querySelector(objTested)) {
            if (obj == square_1 || obj == square_2) {
                if(document.querySelector(objTested) == square_1 || document.querySelector(objTested) == square_2) {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width)+2, parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width)+2 )
                }
                else {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width)+2, parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width) )
                }
            }
            else {
                if(document.querySelector(objTested) == square_1 || document.querySelector(objTested) == square_2) {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width)+2 )
                }
                else {
                    return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width) )
                }
            }
            
        }
    }

}

// Bombs Collider

export function bombColliderChecker (obj) {
    const bomblisted = bombList
    let checked = true
    if (bomblisted != []) {
        for (let direction of directionList) {
            for (let objTested of bomblisted) {
                if (obj != document.querySelector(objTested)) {
                    checked = hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(obj.style.width), parseInt(document.querySelector(objTested).style.left), parseInt(document.querySelector(objTested).style.top), parseInt(document.querySelector(objTested).style.width) )
                }
                if (!checked) {
                    return false
                }
            }
        }
    }
    return true
}
