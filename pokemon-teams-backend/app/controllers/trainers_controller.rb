class TrainersController < ApplicationController

    def index 
        trainers = Trainer.all
        render json: trainers, :include => {
            :pokemon => {:except => [:created_at, :updated_at]}
        }, :except => [:created_at, :updated_at]
    end

    def show

    end
end
