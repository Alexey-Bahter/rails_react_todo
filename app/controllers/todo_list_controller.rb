# frozen_string_literal: true

class TodoListController < ApplicationController
  layout "hello_world"

  def index
    @hello_world_props = { name: "Stranger" }
  end

  def create

  end
end
