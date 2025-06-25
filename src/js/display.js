import { objHpValue } from "./stats.js"

// Import HTML Display

let display_Hp_Value_Player_1 = document.querySelector("#hpValuePlayer1")
let display_Hp_Value_Player_2 = document.querySelector("#hpValuePlayer2")
let display_Hp_Barre_Player_1 = document.querySelector("#hpPlayer1")
let display_Hp_Barre_Player_2 = document.querySelector("#hpPlayer2")

// Display Hp Barre and Values

export function executeDisplayHpBarre () {
    display_Hp_Value_Player_1.textContent = objHpValue.player_1 + "HP"
    display_Hp_Value_Player_2.textContent = objHpValue.player_2 + "HP"
    display_Hp_Barre_Player_1.style.width = objHpValue.player_1 + "%"
    display_Hp_Barre_Player_2.style.width = objHpValue.player_2 + "%"
    if (objHpValue.player_1 > 75) {
        display_Hp_Barre_Player_1.style.backgroundColor = "green"
    }
    else if (objHpValue.player_1 > 50 && objHpValue.player_1 <=75) {
        display_Hp_Barre_Player_1.style.backgroundColor = "yellow"
    }
    else if (objHpValue.player_1 > 25 && objHpValue.player_1 <=50) {
        display_Hp_Barre_Player_1.style.backgroundColor = "orange"
    }
    else if ( objHpValue.player_1 <=25) {
        display_Hp_Barre_Player_1.style.backgroundColor = "red"
    }

    if (objHpValue.player_2 > 75) {
        display_Hp_Barre_Player_2.style.backgroundColor = "green"
    }
    else if (objHpValue.player_2 > 50 && objHpValue.player_2 <=75) {
        display_Hp_Barre_Player_2.style.backgroundColor = "yellow"
    }
    else if (objHpValue.player_2 > 25 && objHpValue.player_2 <=50) {
        display_Hp_Barre_Player_2.style.backgroundColor = "orange"
    }
    else if ( objHpValue.player_2 <=25) {
        display_Hp_Barre_Player_2.style.backgroundColor = "red"
    }
}