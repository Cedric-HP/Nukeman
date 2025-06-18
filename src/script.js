let square_1 = document.querySelector("#block_1")
let square_2 = document.querySelector("#block_2")
const movingBy = 2

// Loader
window.addEventListener("load", () => {
    square_1.style.position = "absolute";
    square_1.style.left = 0 + "px";
    square_1.style.top = 0 + "px";
    square_2.style.position = "absolute";
    square_2.style.left = 880 + "px";
    square_2.style.top = 880 + "px";
})
const objList = [square_1, square_2]
const controller = {
    38: {pressed: false, name: 38},
    40: {pressed: false, name: 40},
    37: {pressed: false, name: 37},
    39: {pressed: false, name: 39},
    90: {pressed: false, name: 90},
    83: {pressed: false, name: 83},
    81: {pressed: false, name: 81},
    68: {pressed: false, name: 68},
    32: {pressed: false, name: 32},
    96: {pressed: false, name: 96}
}
const hitBoxchecker = (direction, xObj_1, yObj_1, xObj_2, yObj_2) => {
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

const objColliderChecker = (obj, direction) => {
    for (let objTested of objList) {
        if (obj != objTested) {
            return hitBoxchecker(direction, parseInt(obj.style.left), parseInt(obj.style.top), parseInt(objTested.style.left), parseInt(objTested.style.top) )
        }
    }

}

const moveplayer = (keyInput) => {

        switch (keyInput) {
            case 38: // Flèche du haut
                if (parseInt(square_1.style.top) != 0 && objColliderChecker(square_1, "UP")) {
                    square_1.style.top = parseInt(square_1.style.top) - movingBy + "px";
                }
                break;
            case 40: // Flèche du bas
                if (parseInt(square_1.style.top) != 880 && objColliderChecker(square_1, "DOWN")) {
                    square_1.style.top = parseInt(square_1.style.top) + movingBy + "px";
                }
                break;
            case 37: // Flèche de Gauche
                if (parseInt(square_1.style.left) != 0 && objColliderChecker(square_1, "LEFT")) {
                    square_1.style.left = parseInt(square_1.style.left) - movingBy + "px";
                }
                break;
            case 39: // Flèche de droite
                if (parseInt(square_1.style.left) != 880 && objColliderChecker(square_1, "RIGHT")) {
                    square_1.style.left = parseInt(square_1.style.left) + movingBy + "px";
                }
                break;
            case 90: // Z
                if (parseInt(square_2.style.top) != 0 && objColliderChecker(square_2, "UP")) {
                    square_2.style.top = parseInt(square_2.style.top) - movingBy + "px";
                }
                break;
            case 83: // S
                if (parseInt(square_2.style.top) != 880 && objColliderChecker(square_2, "DOWN")) {
                    square_2.style.top = parseInt(square_2.style.top) + movingBy + "px";
                }
                break;
            case 81: // Q
                if (parseInt(square_2.style.left) != 0 && objColliderChecker(square_2, "LEFT")) {
                    square_2.style.left = parseInt(square_2.style.left) - movingBy + "px";
                }
                break;
            case 68: // D
                if (parseInt(square_2.style.left) != 880 && objColliderChecker(square_2, "RIGHT")) {
                    square_2.style.left = parseInt(square_2.style.left) + movingBy + "px";
                }
                break;
            case 32: // SPACE
            
                break;
            case 96: // NUMPAD_0
                
                break;
        }
}

document.addEventListener("keydown", (e) => {
    if (controller[e.keyCode]) {
        controller[e.keyCode].pressed = true
    }
})
document.addEventListener("keyup", (e) => {
    if (controller[e.keyCode]) {
        controller[e.keyCode].pressed = false
    }
})

const executeMoves = () => {
    for(let Key in controller) {
        if(controller[Key].pressed)
            moveplayer(controller[Key].name)
    }
}

const animate = () => {
    executeMoves()
    window.requestAnimationFrame(animate)
}
window.requestAnimationFrame(animate)