import { bombPower } from "./stats.js"
import { explosionHitChecker } from "./damage.js"
import { objList } from "./utilitys.js"

// Create Explosion Function

export function createExplosion (bombExploding, player) {
    document.querySelector(bombExploding).style.backgroundColor = "white";

    // Create Explosion

    let explosion = document.createElement("div")
    explosion.style.width = (parseInt(document.querySelector(bombExploding).style.width) * (4 * bombPower[player])) + "px"
    explosion.style.height = (parseInt(document.querySelector(bombExploding).style.width) * (4 * bombPower[player])) +"px"
    explosion.style.backgroundColor = "white";
    explosion.style.position = "absolute";
    explosion.style.borderRadius = 50 + "%";
    explosion.style.zIndex = 1;
    explosion.style.top = ( (parseInt(document.querySelector(bombExploding).style.top) - (parseInt(explosion.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    explosion.style.left = ( (parseInt(document.querySelector(bombExploding).style.left) - (parseInt(explosion.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    document.getElementById('playground').appendChild(explosion);

    // Create Explosion Ring

    let ring = document.createElement("div")
    ring.style.width = (parseInt(document.querySelector(bombExploding).style.width) * (4 * bombPower[player])) + "px"
    ring.style.height = (parseInt(document.querySelector(bombExploding).style.width) * (4 * bombPower[player])) + "px"
    ring.style.position = "absolute";
    ring.style.borderRadius = 50 + "%";
    ring.style.zIndex = 1;
    ring.style.top = ( (parseInt(document.querySelector(bombExploding).style.top) - (parseInt(ring.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    ring.style.left = ( (parseInt(document.querySelector(bombExploding).style.left) - (parseInt(ring.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    document.getElementById('playground').appendChild(ring);

    // Create Bomb Remenant

    let bombRemenant = document.createElement("div")
    bombRemenant.style.width = parseInt(document.querySelector(bombExploding).style.width) + "px"
    bombRemenant.style.height = parseInt(document.querySelector(bombExploding).style.width) +"px"
    bombRemenant.style.backgroundColor = "white";
    bombRemenant.style.position = "absolute";
    bombRemenant.style.borderRadius = 50 + "%";
    bombRemenant.style.zIndex = 1;
    bombRemenant.style.top = ( (parseInt(document.querySelector(bombExploding).style.top) - (parseInt(bombRemenant.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    bombRemenant.style.left = ( (parseInt(document.querySelector(bombExploding).style.left) - (parseInt(bombRemenant.style.width) / 2)) + (parseInt(document.querySelector(bombExploding).style.width) / 2)) + "px"
    document.getElementById('playground').appendChild(bombRemenant);
    
    // Damage Calcule Initialisation

    explosionHitChecker(explosion, player, objList)

    // Animation

    ring.style.animation = "ringExplosion 0.75s 1 both";
    explosion.style.animation = "explsotion 1s 1 both";
    bombRemenant.style.animation = "bombExplode 0.1s 1 both";

    // Remove the parent bomb

    document.querySelector(bombExploding).remove()

    // Timer to remove Explosion Objects

    let timer = 100
    const contDown = setInterval(() => {
        if(timer == 0) {
            ring.remove()
            explosion.remove()
            bombRemenant.remove()
            clearInterval(contDown)
        }
        timer -= 1
    }, "10")
}