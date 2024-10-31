if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(event) {
        // Récupérer l'accélération sur les axes x, y et z
        const accX = event.acceleration.x;
        const accY = event.acceleration.y;
        const accZ = event.acceleration.z;
        
        // Récupérer la rotation (vitesse angulaire)
        const rotAlpha = event.rotationRate.alpha; // autour de l'axe Z
        const rotBeta = event.rotationRate.beta;   // autour de l'axe X
        const rotGamma = event.rotationRate.gamma; // autour de l'axe Y

        console.log(`Accélération - X: ${accX}, Y: ${accY}, Z: ${accZ}`);
        console.log(`Rotation - Alpha: ${rotAlpha}, Beta: ${rotBeta}, Gamma: ${rotGamma}`);
        document.getElementById("log").innerHTML = `Accélération - X: ${accX}, Y: ${accY}, Z: ${accZ}`;
    });
} else {
    console.log("DeviceMotion n'est pas supporté par ce navigateur.");
    document.getElementById("log").innerHTML = `caca`;
}


async function main() {
    try {
        const response = await fetch("http://mercure.projectheberg.com:20220/caca");
        const objects = await response.json();
        console.log(objects);
        //document.getElementById('output').textContent = JSON.stringify(objects, null, 2);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

async function postObject() {
    const input = document.getElementById("input").value;
    const object = { data: input };

    try {
        const response = await fetch("http://mercure.projectheberg.com:20220/caca", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object)
        });

        if (response.ok) {
            console.log('Objet envoyé avec succès');
            main();  // Recharger les données après l'envoi
        } else {
            console.error('Erreur lors de l\'envoi de l\'objet');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
    }
}

// Appel de la fonction pour charger les données au démarrage
main();
