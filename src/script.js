let square = document.querySelector("#block")
let movingBy = 50

window.addEventListener("load", () => {
    square.style.position = "relative";
    square.style.left = 0;
    square.style.top = 0;
})

const movement = (object, amount, direction) => {

}
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (parseInt(square.style.top) == 0) {
                square.style.top = 850 + "px";
            }
            else {
                square.style.top = parseInt(square.style.top) - movingBy + "px";
            }
            break;
        case "ArrowDown":
            if (parseInt(square.style.top) == 850) {
                square.style.top = 0 + "px";
            }
            else {
                square.style.top = parseInt(square.style.top) + movingBy + "px";
            }
            break;
        case "ArrowLeft":
            if (parseInt(square.style.left) == 0) {
                square.style.left = 850 + "px";
            }
            else {
                square.style.left = parseInt(square.style.left) - movingBy + "px";
            }
            break;
        case "ArrowRight":
            if (parseInt(square.style.left) == 850) {
                square.style.left = 0 + "px";
            }
            else {
                square.style.left = parseInt(square.style.left) + movingBy + "px";
            }
            break;
    }
})


