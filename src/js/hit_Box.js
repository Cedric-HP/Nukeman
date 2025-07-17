import { square_1, square_2, positionBlackList } from "./utilitys.js"

const directionList = ["UP", "DOWN", "LEFT", "RIGHT"]

/** Universal Hit-Box checker function
* Check if two objects are colliding or not. 
* @param {string} direction - The direction of the Hit-Box Check
* @param {number} xObj_1 - X coordinate of Object 1
* @param {number} yObj_1 - Y coordinate of Object 1
* @param {number} xSizeObj1 - Width of Object 1
* @param {number} ySizeObj1 - height of Object 1
* @param {number} xObj_2 - X coordinate of Object 2
* @param {number} yObj_2 - Y coordinate of Object 2
* @param {number} xSizeObj2 - Width of Object 2
* @param {number} ySizeObj2 - height of Object 2
* @returns {boolean} - Return TRUE if the objects don't collide | FALSE if they are colliding.
*/

const hitBoxchecker = (direction, xObj_1, yObj_1, xSizeObj1, ySizeObj1, xObj_2, yObj_2, xSizeObj2, ySizeObj2) => {
    switch(direction) {
        case "UP":
            if( ( yObj_1 <= yObj_2 + ySizeObj2 && yObj_2 - yObj_1 < ySizeObj1 ) && ( xObj_1 < xObj_2 + xSizeObj2 && xObj_2 - xObj_1 < xSizeObj1 ) ) {
                return false
            }
            else {
                return true
            }
        case "DOWN":
            if( ( yObj_1 < yObj_2 + ySizeObj2 && yObj_2 - yObj_1 <= ySizeObj1 ) && ( xObj_1 < xObj_2 + xSizeObj2 && xObj_2 - xObj_1 < xSizeObj1 ) ) {
                return false
            }
            else {
                return true
            }
        case "LEFT":
            if( ( xObj_1 <= xObj_2 + xSizeObj2 && xObj_2 - xObj_1 < xSizeObj1 ) && ( yObj_1 < yObj_2 + ySizeObj2 && yObj_2 - yObj_1 < ySizeObj1 ) ) {
                return false
            }
            else {
                return true
            }
        case "RIGHT":
            if( ( xObj_1 < xObj_2 + xSizeObj2 && xObj_2 - xObj_1 <= xSizeObj1 ) && ( yObj_1 < yObj_2 + ySizeObj2 && yObj_2 - yObj_1 < ySizeObj1 ) ) {
                return false
            }
            else {
                return true
            }
    }
}

// Function used by "objColliderChecker" to execute the Hit-Box Check

const objColliderTester = (obj, direction, objListed) => {
    let checked = true
    for (let objTested in objListed) {
        if (obj != document.querySelector(objTested)) {
            if (obj == square_1 || obj == square_2) {
                if(document.querySelector(objTested) == square_1 || document.querySelector(objTested) == square_2) {
                    checked = hitBoxchecker(
                        direction,
                        parseInt(obj.style.left),
                        parseInt(obj.style.top),
                        (parseInt(obj.style.width)+2),
                        (parseInt(obj.style.height)+2),
                        parseInt(document.querySelector(objTested).style.left),
                        parseInt(document.querySelector(objTested).style.top),
                        (parseInt(document.querySelector(objTested).style.width)+2),
                        (parseInt(document.querySelector(objTested).style.height)+2) )
                }
                else {
                    checked = hitBoxchecker(
                        direction,
                        parseInt(obj.style.left),
                        parseInt(obj.style.top),
                        (parseInt(obj.style.width)+2),
                        (parseInt(obj.style.height)+2),
                        parseInt(document.querySelector(objTested).style.left),
                        parseInt(document.querySelector(objTested).style.top),
                        parseInt(document.querySelector(objTested).style.width),
                        parseInt(document.querySelector(objTested).style.height)
                    )
                }
            }
            else {
                if(document.querySelector(objTested) == square_1 || document.querySelector(objTested) == square_2) {
                    checked = hitBoxchecker(
                        direction,
                        parseInt(obj.style.left),
                        parseInt(obj.style.top),
                        parseInt(obj.style.width),
                        parseInt(obj.style.height),
                        parseInt(document.querySelector(objTested).style.left),
                        parseInt(document.querySelector(objTested).style.top),
                        (parseInt(document.querySelector(objTested).style.width)+2),
                        (parseInt(document.querySelector(objTested).style.height)+2)
                    )
                }
                else {
                    checked = hitBoxchecker(
                        direction,
                        parseInt(obj.style.left),
                        parseInt(obj.style.top),
                        parseInt(obj.style.width),
                        parseInt(obj.style.height),
                        parseInt(document.querySelector(objTested).style.left),
                        parseInt(document.querySelector(objTested).style.top),
                        parseInt(document.querySelector(objTested).style.width),
                        parseInt(document.querySelector(objTested).style.height)
                    )
                }
            }
        }
        if (!checked) {
            return false
        }
    }
    return true
}

/** Objects collider function
 * Test if the input object collides with an object in the input list located in the direction given as input.
 * @param {object} obj - Input object
 * @param {string} direction - Input direction ("ALL" argument will test all direction)
 * @param {array} objArrayList
 * @returns {boolean} - Return TRUE if the object don't collide with any object of the input list | FALSE if the object collide with any object of the input list .
 */

export function objColliderChecker (obj, directionInput, objObjectList) {
    let checked = true
    if (objObjectList != {}) {
        if (directionInput == "ALL") {
            for (let direction of directionList) {
                checked = objColliderTester(obj, direction, objObjectList)
                if (!checked) {
                    return false
                }
            }
        }
        else {
            return objColliderTester(obj, directionInput, objObjectList)
        }   
    }
    return true
}

export function positionBlackListChecker (objPositionTested) {
    let check = true
    for (let position in positionBlackList) {
        for(let direction of directionList) {
            check = hitBoxchecker(
                direction, 
                parseInt(objPositionTested.style.left), 
                parseInt(objPositionTested.style.top), 
                parseInt(objPositionTested.style.width), 
                parseInt(objPositionTested.style.height),
                positionBlackList[position][0],
                positionBlackList[position][1],
                positionBlackList[position][2],
                positionBlackList[position][3]
             )
        }
        if (!check) {
            return false
        }
    }
    return true
}