export function hitBoxchecker (direction, xObj_1, yObj_1, xObj_2, yObj_2) {
    switch(direction) {
        case "UP":
            if( ( yObj_1 - yObj_2 <= 20 && yObj_1 - yObj_2 > -20 ) && (xObj_1 - xObj_2 < 20 && xObj_1 - xObj_2 > -20) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "DOWN":
            if( ( yObj_2 - yObj_1 <= 20 && yObj_2 - yObj_1 > -20 ) && (xObj_1 - xObj_2 < 20 && xObj_1 - xObj_2 > -20) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "LEFT":
            if( ( xObj_1 - xObj_2 <= 20 && xObj_1 - xObj_2 > -20 ) && (yObj_1 - yObj_2 < 20 && yObj_1 - yObj_2 > -20) ) {
                return false
            }
            else {
                return true
            }
            break;
        case "RIGHT":
            if( (xObj_2 - xObj_1 <= 20 && xObj_2 - xObj_1 > -20) && (yObj_1 - yObj_2 < 20 && yObj_1 - yObj_2 > -20) ) {
                return false
            }
            else {
                return true
            }
            break;
    }
}