//on enregistre la clé dans une variable pour eviter les repetetions
const Key = '475f61419f9c118a5c3d14b1e585bc68';
//selectionne les differents elements html
const buttons = document.querySelectorAll('.pays button');
const weatherText = document.getElementById('weath');
const degreeText = document.getElementById('degre');
const weatherIcon = document.querySelector('.icon-temps');

//creation de la fonction affichage de la meteo
function displayWeather() {
    //on recup la valeur de nos id 
    const cityName = this.id;
    let latitude;
    let longitude;
    //on verifie tout nos id de notre page html (meme ceux hors pays)
    // Récupération des coordonnées de latitude et longitude grace a l'id du button
    if (cityName === 'france') {
      latitude = '46.227638';
      longitude = '2.213749';
    } else if (cityName === 'alaska') {
      latitude = '64.2008413';
      longitude = '-149.4936733';
    } else if (cityName === 'japon') {
      latitude = '36.204824';
      longitude = '138.252924';
    } else if (cityName === 'mont') {
      latitude = '-3.0674259';
      longitude = '37.3556271';
    } else if (cityName === 'mexique') {
      latitude = '23.634501';
      longitude = '-102.552784';
    }
  
    // Affichage du loader
    weatherText.innerHTML = 'Chargement...'; // on ecrit dans une balise html grace au inner
    weatherIcon.src = './img/weather-icons/loader.svg'; // on ecrit dans le src de l'image cette fois grace au src
    degreeText.innerHTML='&emsp;'; // je met un espace vide grace au caractere special ascii pour que le degres ne s'affiche pas 
        // settimeout va permettre d'attendre 0.5s avant de lancer ce qu'il y'a a l'interieur ( donc notre fetch )
    setTimeout(() => {

        // je lance ma fonction fetch / api call
        // je remplis mon url de l'api avec ma clé et les données lat et long
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&units=metric&appid=${Key}`)
        .then(response => response.json()) // on dit que notre reponse qu'on obtient est en json pour qu'il comprenne
        .then(data => { // dans la partie DATA , on va stocker les valeurs du json dans des variables 
          const temperature = data.main.temp.toString().replace(".", ","); //le degres, je vais remplacer les . par des , grace a la fct replace()
          const description = data.weather[0].description; // le temps qu'il fait 
          const iconCode = data.weather[0].icon; // le code icon
          const iconUrl = `./img/weather-icons/${iconCode}.svg`; // l'url final (que je vais utilisé) que je construit en lui mettant le code icon
          degreeText.innerHTML = `${temperature}&deg;C`; // on va maintenant affiché ! le degres dans notre degree.text qui est notre id degree
          weatherText.innerHTML = description; // pareil on va affiché dans notre id weath
          weatherIcon.src = iconUrl; // on va affiché notre image (on utilise src pour les chemins) 
        })
        .catch(error => console.error(error)); // au cas ou il y'a une erreur 
    }, 500); // attendre 0,5 seconde (500ms) avant d'exécuter la fonction fetch() grace a la fonction settimeout ce qui va nous creer un loader 
  }
  
  
// Affichage de la météo pour la France au chargement de la page (par defaut)
displayWeather.call(document.getElementById('france'));

// on parcours tout nos boutons , et lorsqu'un de ces btn est cliqué on appel notre fonction displayWeather() qu'on a creer precedemment
buttons.forEach((button) => {
  button.addEventListener('click', displayWeather);
});