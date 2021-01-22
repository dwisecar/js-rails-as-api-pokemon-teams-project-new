require 'json'
class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: pokemons, :include => {
            :trainer => {:except => [:created_at, :updated_at]}
        }, :except => [:created_at, :updated_at]
    end

    def create
        pokemon = {
            trainer_id: JSON.parse(request.body.string)['trainer_id'],
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        }
        Pokemon.create(pokemon)

        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
    end

end
