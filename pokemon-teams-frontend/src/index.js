const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//DATA
function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
}

function postPokemon(trainerId){
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ trainer_id: trainerId })
    })
    .then(res => res.json())
    .then(pokemon => renderPokemon(pokemon))
    .catch(error => console.log(error.message))
}

function deletePokemon(id){
    fetch(POKEMONS_URL + `/${id}`, {
        method: 'DELETE'
    }).then(() => removePokemon(id))
    
}

//DOM
function renderTrainer(trainer){
    const card = document.createElement('div')
    card.className = 'card'
    card.dataset.id = trainer.id
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name

    const addPokemon = document.createElement('button')
    addPokemon.dataset.trainerId = trainer.id
    addPokemon.innerText = 'Add Pokemon'
    addPokemon.addEventListener('click', addPokeHandler)

    const pokemonList = document.createElement('ul')

    card.append(trainerName, addPokemon, pokemonList)
    document.querySelector('main').append(card)

    trainer.pokemon.forEach(pokemon => renderPokemon(pokemon));
}

function renderPokemon(pokemon){
    const trainerCard = document.querySelector(`[data-id = '${pokemon.trainer_id}']`)
    const pokemonList = trainerCard.querySelector('ul')
    const pokemonLi = document.createElement('li')
    const releaseButton = document.createElement('button')
    releaseButton.dataset.pokemonId = pokemon.id
    releaseButton.className = 'release'
    releaseButton.innerText = 'Release'
    releaseButton.addEventListener('click', handleRelease)
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    pokemonLi.append(releaseButton)
    pokemonList.append(pokemonLi)
}

function removePokemon(id){
    const pokemon = document.querySelector(`[data-pokemon-id = '${id}']`)
    pokemon.parentElement.remove()
}

//HANDLERS
function addPokeHandler(e){
    const trainerCard = document.querySelector(`[data-id = '${e.target.dataset.trainerId}']`)
    const pokeList = trainerCard.querySelector('ul')
    if (pokeList.childElementCount >= 6) {
        alert("you already have 6 pokemon")
    } else {
        postPokemon(parseInt(e.target.dataset.trainerId))
    }
}

function handleRelease(e){
    deletePokemon(e.target.dataset.pokemonId)
}



fetchTrainers()