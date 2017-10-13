# frozen_string_literal: true

class TodoListsController < ApplicationController
  layout "hello_world"

  def index
    @props = { todoList: [] }
  end

  def create

  end
end
