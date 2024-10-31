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
