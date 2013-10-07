require 'sinatra'
require 'sinatra/reloader' if development?
require 'mongo'
require 'json'

#set :environment => 'local'

#begin
configure do
  CONNECTION  = Mongo::Connection.from_uri('mongodb://test:test@ds043158.mongolab.com:43158/heroku_app17961664')
  DB 				  = CONNECTION.db('heroku_app17961664')
  #ARMIES			= DB["armies"]
  UNITS 			= DB['units']
  #WEAPONS 		= DB["weapons"]
  #SPECIAL_RULES 	= DB["special_rules"]
#  set :haml, :format => :html5
end
#end

# RACK_ENV=local

=begin

configure do
  #system('mongod --dbpath c:\dev\data\mongodb')
  CONNECTION  = Mongo::Connection.from_uri('mongodb://test:test@localhost/w40')
  DB 				  = CONNECTION.db('w40')
  UNITS 			= DB['units']
end

=end


# De momento todas las respuestas son json
before do
  #content_type :json
end

get '/' do
  content_type 'html'
  # TODO: si es estático debería servirlo un Apache, etc.
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/api/units' do
  content_type :json
  @units = UNITS.find.to_a.to_json
  #JSON.pretty_generate(@units)
end

post '/api/units' do
  # Probar > http://stackoverflow.com/questions/12131763/sinatra-controller-params-method-coming-in-empty-on-json-post-request
  @json = JSON.parse(request.body.read)
  puts @json
end

get '/api/units/:id' do
  content_type :json
  @units = UNITS.find_one({_id: params[:id]}).to_json
  #JSON.pretty_generate(@units)
end