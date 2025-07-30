import { generateIntervalPowerUp, generatePowerUp, generationPowerUpTimeOut, isWaitingGenerationPowerUp, powerUpGenInterval, removePowerUp } from "./powerUp_generation.js"
import { bombPower, bombTimeSet, coolDownTimeSet, maxBomb, objHpMaxValue, objHpValue, playerScore, regenerationStats } from "./stats.js"
import { generation, generationTimer, removeBlock } from "./terrain_generation.js"
import { generateButton, generationUtilitises, menuUtility, pauseButton, pauseLogo, playgroundCover, restartButton } from "./utilitys.js"

const resetLevels = () => {
    playerScore.player_1.level = 1
    playerScore.player_2.level = 1
    playerScore.player_1.score = 0
    playerScore.player_2.score = 0
}

const resetKillCount = () => {
    playerScore.player_1.kill = 0
    playerScore.player_2.kill = 0
}

const resetRound = () => {
    playerScore.player_1.roundWin = 0
    playerScore.player_2.roundWin = 0
}

const resetstats = () => {
    bombPower.player_1 = 1
    bombPower.player_2 = 1
    coolDownTimeSet.player_1 = 100
    coolDownTimeSet.player_2 = 100
    maxBomb.player_1 = 1
    maxBomb.player_2 = 1
    bombTimeSet.player_1 = 200
    bombTimeSet.player_2 = 200
    regenerationStats.player_1.regenSpeed = 1
    regenerationStats.player_2.regenSpeed = 1
    objHpMaxValue.player_1 = 100
    objHpMaxValue.player_2 = 100
    playerScore.player_1.multiplier = 1
    playerScore.player_2.multiplier = 1
}

// Restart Button

restartButton.addEventListener("click", () => {
    objHpValue["player_1"] = 0
    objHpValue["player_2"] = 0
    resetLevels()
    resetstats()
    resetRound()
    resetKillCount()
    restartButton.blur()
})

// Generate Map Button

generateButton.addEventListener("click", () => {
    if (!generationUtilitises.isGenerating) {
        removePowerUp()
        removeBlock()
        generationUtilitises.executed = 2
        generationUtilitises.isGenerating = true
        if (isWaitingGenerationPowerUp) {
            clearTimeout(generationPowerUpTimeOut)
        }
        generatePowerUp(20, 1.001)
        generationTimer(1)
        generation(80, false, 20, 80, "count1")
        generation(40, true, 20, 60, "count2")
        if (generationUtilitises.hisGenIntervalPowerUp) {
            clearInterval(powerUpGenInterval)
            generationUtilitises.hisGenIntervalPowerUp = false
        }
        generateIntervalPowerUp("center", "powerfull", 30)
        generateButton.blur()
    }
})

// Pause Button 

pauseButton.addEventListener("click",() => {
    pauseFunc()
})

document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27) {
        pauseFunc()
    }
})

pauseLogo.addEventListener("click",() => {
    pauseFunc()
})

let isPausing = false

const pauseFunc = () => {
    if(!isPausing) {
        isPausing = true
        if (menuUtility.inPause) {
            pauseButton.textContent = "Pause"
            playgroundCover.style.animation = "opacityOut 0.2s 1 both"
            menuUtility.inPause = false
            pauseLogo.disabled = true
            setTimeout(()=> {
                isPausing = false
            }, 150)
        }
        else {
            pauseButton.textContent = "Resume"
            playgroundCover.style.animation = "opacityIn 0.2s 1 both"
            menuUtility.inPause = true
            pauseLogo.disabled = false
            setTimeout(()=> {
                isPausing = false
            }, 150)
        }
    }
    pauseButton.blur()
}