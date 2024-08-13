/*
Ma barre de recherche:
OK - Récupérer le nom renseignée par le visiteur
OK - A partir du nom -> trouver la longitude et la latitude correspondante
OK - Si la ville renseignée n'est pas dans la base de donnée (fichier json), afficher un message à l'utilisateur

BONUS : 
OK - Auto-completion : Proposer une sugestion en fonction des lettres taper par l'utilisateur
- Sauvegarder les dernières recherches
*/


class Search 
{
    constructor() {
        // 1er temps : Définir les variables
        this.input = document.querySelector('.js-search-input');
        this.suggestions = document.querySelector('.js-search-suggestions')
        this.form = document.querySelector('.js-search-form');
        this.messageError = document.querySelector('.js-search-error-message')
        this.cities = [];
        // 2ème temps : Lancer les fonction
        this.init();
    }

    init() {
        this.getCities();
        this.watchUserInput();
    };

    watchUserInput(){
        this.input.addEventListener('input', () => {
            this.showSuggestions()
        })
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.getLatAndLong();
        })
    };

    // Récupère les objects du fichier json
    getCities() {
        fetch('../data/france-cities.json')
            .then(response => response.json())
            .then(data => {
                this.cities = data;
            })
    }

    // Propose des suggestions de ville à l'utilisateur lors de sa saisie
    showSuggestions() {
        const input = this.input.value.toLowerCase();
        this.suggestions.innerHTML = '';
        if (input.length > 1) {
            // Filtre le nom des villes par lettre écrit dans l'input
            const filteredCities = this.cities.filter(city =>
                city.city.toLowerCase().startsWith(input)
            );
            // Affiche les suggestions ainsi que la possibilité d'en choisir un
            if (filteredCities.length > 0) {
                this.suggestions.style.display = 'block';
                filteredCities.forEach(city => {
                    const li = document.createElement('li');
                    li.textContent = city.city;
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', () => {
                        this.input.value = city.city;
                        this.suggestions.innerHTML = '';
                        this.suggestions.style.display = 'none';
                    });
                    this.suggestions.appendChild(li);
                });
            } else {
                this.suggestions.style.display = 'none';
            }
        } else {
            this.suggestions.style.display = 'none';
        }
    }

    // Récupère la latitude et la longitude de la ville demandée
    getLatAndLong() {
        const cityName = this.input.value
        // 1 : Récupérer objet correspondant à la ville 
        const cityData = this.getCityData(cityName);
        if (cityData.name != "" ) {
            // Si oui => je récupère lat et long
            this.lat = cityData.lat;
            console.log(this.lat)
            this.long = cityData.lng;
            console.log(this.long)
            this.messageError.textContent = "";
        } else {
            // 3 : Si non => j'envoie un message d'erreur
            this.messageError.textContent = 'La ville demandée n\'a pas été trouvée. \n merci de vérifier l\'ortographe ou de choisir une autre ville';
        }
    }

    // Recherche une correspondance entre la ville demandée et la base de donnée
    getCityDataWithFor(cityName) {
        const cityNameLower = cityName.toLowerCase()
        let cityData = {};
        for (let i = 0; i < this.cities.length; i++) {
            const cityNameInDataLower = this.cities[i].toLowerCaser();
            if (cityNameInDataLower === cityNameLower){
                cityData = this.cities[i];
                break;
            }
        }
    }

    // Récupère la ville
    getCityData(cityName) {
        const cityNameLower = cityName.toLowerCase();
        let cityData = this.cities.find(
            (cityObject) => cityObject.city.toLowerCase() === cityNameLower
        );
        console.log(cityData);
        return cityData;
    }
}

export { Search }