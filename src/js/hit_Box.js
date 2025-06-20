export function hitBoxchecker (direction, xObj_1, yObj_1, sizeObj1, xObj_2, yObj_2, sizeObj2) {
    switch(direction) {
        case "UP":
            if( ( yObj_1 - yObj_2 <= sizeObj2 && yObj_1 - yObj_2 > -sizeObj2 ) && ( xObj_1 - xObj_2 < sizeObj2 && xObj_1 - xObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "DOWN":
            if( ( yObj_2 - yObj_1 <= sizeObj1 && yObj_2 - yObj_1 > -sizeObj1 ) && (xObj_1 - xObj_2 < sizeObj2 && xObj_1 - xObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "LEFT":
            if( ( xObj_1 - xObj_2 <= sizeObj2 && xObj_1 - xObj_2 > -sizeObj2 ) && (yObj_1 - yObj_2 < sizeObj2 && yObj_1 - yObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "RIGHT":
            if( (xObj_2 - xObj_1 <= sizeObj1 && xObj_2 - xObj_1 > -sizeObj1) && (yObj_1 - yObj_2 < sizeObj2 && yObj_1 - yObj_2 > -sizeObj1) ) {
                return false
            }
            else {
                return true
            }
            break;
    }
}
export function explosionHitChecker (explosionId) {
    for (let playerTested in playerlist) {
        
    }
    for (let objHitTested in objIdentifier) {

    }
}