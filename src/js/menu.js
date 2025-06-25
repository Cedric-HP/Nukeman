import { objHpValue } from "./stats.js"
import { generation, removeBlock } from "./terrain_generation.js"

const restartButton = document.querySelector("#restart_button")
const generateButton = document.querySelector("#generate_button")

// Restart Button

restartButton.addEventListener("click", () => {
    objHpValue["player_1"] = 0
    objHpValue["player_2"] = 0
})

// Generate Map Button

generateButton.addEventListener("click", () => {
    removeBlock()
    generation(80, false, 20, 80)
    generation(40, true, 20, 60)
})