import { levelCap, objHpMaxValue, objHpValue, playerScore } from "./stats.js"

// Import HTML Display

// Hp

const display_Hp_Value_Player_1 = document.querySelector("#hpValuePlayer1")
const display_Hp_Value_Player_2 = document.querySelector("#hpValuePlayer2")
const display_Hp_Barre_Player_1 = document.querySelector("#hpPlayer1")
const display_Hp_Barre_Player_2 = document.querySelector("#hpPlayer2")

// Level

const display_Level_stats_Player_1 = document.querySelector("#expInfoP1")
const display_Level_stats_Player_2 = document.querySelector("#expInfoP2")
const display_Level_barre_Player_1 = document.querySelector("#expPlayer1")
const display_Level_barre_Player_2 = document.querySelector("#expPlayer2")

// Kill and Round

const display_Kill_Count_Player_1 = document.querySelector("#killcountP1")
const display_Kill_Count_Player_2 = document.querySelector("#killcountP2")
const display_Round_Player_1 = document.querySelector("#roundP1")
const display_Round_Player_2 = document.querySelector("#roundP2")

// Display Hp Barre and Values

export function executeDisplayHpBarre () {
    display_Hp_Value_Player_1.textContent = objHpValue.player_1 + "HP"
    display_Hp_Value_Player_2.textContent = objHpValue.player_2 + "HP"
    display_Hp_Barre_Player_1.style.width = ( (objHpValue.player_1/objHpMaxValue.player_1) * 100) + "%"
    display_Hp_Barre_Player_2.style.width = ( (objHpValue.player_2/objHpMaxValue.player_2) * 100) + "%"
    if (( (objHpValue.player_1/objHpMaxValue.player_1) * 100) > 75) {
        display_Hp_Barre_Player_1.style.backgroundColor = "green"
    }
    else if (( (objHpValue.player_1/objHpMaxValue.player_1) * 100) > 50 && ( (objHpValue.player_1/objHpMaxValue.player_1) * 100) <=75) {
        display_Hp_Barre_Player_1.style.backgroundColor = "yellow"
    }
    else if (( (objHpValue.player_1/objHpMaxValue.player_1) * 100) > 25 && ( (objHpValue.player_1/objHpMaxValue.player_1) * 100) <=50) {
        display_Hp_Barre_Player_1.style.backgroundColor = "orange"
    }
    else if ( ( (objHpValue.player_1/objHpMaxValue.player_1) * 100) <=25) {
        display_Hp_Barre_Player_1.style.backgroundColor = "red"
    }

    if (( (objHpValue.player_2/objHpMaxValue.player_2) * 100) > 75) {
        display_Hp_Barre_Player_2.style.backgroundColor = "green"
    }
    else if (( (objHpValue.player_2/objHpMaxValue.player_2) * 100) > 50 && ( (objHpValue.player_2/objHpMaxValue.player_2) * 100) <=75) {
        display_Hp_Barre_Player_2.style.backgroundColor = "yellow"
    }
    else if (( (objHpValue.player_2/objHpMaxValue.player_2) * 100) > 25 && ( (objHpValue.player_2/objHpMaxValue.player_2) * 100) <=50) {
        display_Hp_Barre_Player_2.style.backgroundColor = "orange"
    }
    else if ( ( (objHpValue.player_2/objHpMaxValue.player_2) * 100) <=25) {
        display_Hp_Barre_Player_2.style.backgroundColor = "red"
    }
}

export function executeDisplayLevel () {
    if (levelCap[playerScore.player_1.level].cap !== 0) {
        display_Level_stats_Player_1.textContent = `Level ${playerScore.player_1.level} | EXP: ${playerScore.player_1.score} / ${levelCap[playerScore.player_1.level].cap}`
    }
    else {
        display_Level_stats_Player_1.textContent = `Level ${playerScore.player_1.level} Max | EXP: ${playerScore.player_1.score}`
    }
    if (levelCap[playerScore.player_2.level].cap !== 0) {
        display_Level_stats_Player_2.textContent = `Level ${playerScore.player_2.level} | EXP: ${playerScore.player_2.score} / ${levelCap[playerScore.player_2.level].cap}`
    }
    else {
        display_Level_stats_Player_2.textContent = `Level ${playerScore.player_2.level} Max | EXP: ${playerScore.player_2.score}`
    }
    display_Level_barre_Player_1.style.width = ( (playerScore.player_1.score / levelCap[playerScore.player_1.level]) * 100 ) + "%"
    display_Level_barre_Player_2.style.width = ( (playerScore.player_2.score / levelCap[playerScore.player_2.level]) * 100 ) + "%"
}

export function executeDisplayRoundKill () {
    display_Kill_Count_Player_1.textContent = playerScore.player_1.kill
    display_Kill_Count_Player_2.textContent = playerScore.player_2.kill
    display_Round_Player_1.textContent = playerScore.player_1.roundWin
    display_Round_Player_2.textContent = playerScore.player_2.roundWin
}