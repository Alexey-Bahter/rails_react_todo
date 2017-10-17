# frozen_string_literal: true

class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout "hello_world"

  def index
    @todos = Todo.all
    @todos = { allTodos:  @todos }
    # paginate(:page => params[:page], :per_page => 5)
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

  def update

    @todo = Todo.find(params[:id])
    # byebug
    @todo.update_attribute :done, params[:todo][:done]
    @todo.update_attribute :body, params[:todo][:body]
    # byebug
  end

  def destroy
    # byebug
    @todo=Todo.find(params[:id])
    @todo.destroy
    # byebug
    # params.each {|i,k| puts k if i=="id"}
  end

  def todos_params
    params.require(:todo).permit(:body, :user_id, :done)
  end
end
