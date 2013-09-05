require 'sinatra'
require 'sinatra/reloader' if development?

get '/' do
  "----"
end

get 'test' do
  "test"
end