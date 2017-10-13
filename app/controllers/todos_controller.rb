# frozen_string_literal: true

class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout "hello_world"

  def index
    # @todos = Todo.all
    @todos = { todoList: [] }
  end

  def create
    # byebug
    @todo = Todo.new(todos_params)
    if @todo.save
    else
      flash[:danger] = @todo.errors.full_messages.to_sentence
      render :index
    end
  end

  def todos_params
    params.require(:todo).permit(:body, :user_id, :done)
  end
end
