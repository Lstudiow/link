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
        const response = await fetch("http://localhost:3000/api/stuff", {
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
