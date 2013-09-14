require 'sinatra'
require 'sinatra/reloader' if development?
require 'mongo'

configure do
  CONNECTION  = Mongo::Connection.from_uri('mongodb://test:test@ds043158.mongolab.com:43158/heroku_app17961664')
  DB 				  = CONNECTION.db("heroku_app17961664")
  #ARMIES			= DB["armies"]
  UNITS 			= DB["units"]
  #WEAPONS 		= DB["weapons"]
  #SPECIAL_RULES 	= DB["special_rules"]
#  set :haml, :format => :html5
end

get '/units' do
  @units = UNITS.find
end