require 'sinatra'
require 'sinatra/reloader' if development?
require 'mongo'
require 'json'

#set :environment => 'local'

=begin
configure do
  CONNECTION  = Mongo::Connection.from_uri('mongodb://test:test@ds043158.mongolab.com:43158/heroku_app17961664')
  DB 				  = CONNECTION.db('heroku_app17961664')
  #ARMIES			= DB["armies"]
  UNITS 			= DB['units']
  #WEAPONS 		= DB["weapons"]
  #SPECIAL_RULES 	= DB["special_rules"]
#  set :haml, :format => :html5
end
=end


# RACK_ENV=local
configure do
  #system('mongod --dbpath c:\dev\data\mongodb')
  CONNECTION  = Mongo::Connection.from_uri('mongodb://test:test@localhost/w40')
  DB 				  = CONNECTION.db('w40')
  UNITS 			= DB['units']
  WEAPONS     = DB['weapons']
end


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
  #@json = JSON.parse(request.body.read)
  content_type :json
  oid = UNITS.insert(JSON.parse(request.body.read.to_s))
  puts oid
  #"{\"id\": \"#{oid.to_s}\"}"
end

put '/api/units/:id' do
  content_type :json
  puts BSON::ObjectId(params[:id])
  # collection.update() when used with $set (as covered earlier) allows us to set single values
  # in this case, the put request body is converted to a string, rejecting keys with the name 'id' for security purposes
  #DB.collection(params[:thing]).update({'id' => tobsonid(params[:id])}, {'$set' => JSON.parse(request.body.read.tos).reject{|k,v| k == 'id'}})
  UNITS.update({_id: BSON::ObjectId(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}})
end

get '/api/units/:id' do
  content_type :json
  #@units = UNITS.find_one({_id: params[:id]}).to_json
  @units = UNITS.find_one({_id: BSON::ObjectId(params[:id])}).to_json
  #JSON.pretty_generate(@units)
end

delete '/api/units/:id' do
  content_type :json
  puts params[:id]
  #DB.collection('units').remove({_id: params[:id]})
  #UNITS.remove("name" => "test")
  @return = UNITS.remove({_id: BSON::ObjectId(params[:id])})

  puts @return
  {:success => true}.to_json
end

get '/api/weapons' do
  content_type :json
  @weapons = WEAPONS.find.to_a.to_json
end
