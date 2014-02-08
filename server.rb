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
  RULES       = DB['rules']
end


# De momento todas las respuestas son json
before do
  #content_type :json
  #request.body.rewind
  #@request_payload = JSON.parse(request.body.read.to_s)
end

get '/' do
  content_type 'html'
  # TODO: si es estático debería servirlo un Apache, etc.
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/api/units' do
  content_type :json
  # En la lista sólo id, nombre y coste
  @units = UNITS.find({}, {:fields => ["name", "cost"]}).to_a.to_json
end

get '/api/units/:id' do
  content_type :json
  unit = UNITS.find_one({_id: BSON::ObjectId(params[:id])})
  #sputs unit["specialRules"]
  unit["specialRules"].map!{|rule| RULES.find_one({_id: rule}, {:fields => ["name"]})}
  unit.to_json
  #@unit = UNITS.find_one({_id: BSON::ObjectId(params[:id])}).to_json
  #JSON.pretty_generate(@units)
end

put '/api/units/:id' do
  content_type :json
  #puts BSON::ObjectId(params[:id])

  @request_payload = JSON.parse(request.body.read.to_s)
  @id = BSON::ObjectId(@request_payload["_id"]["$oid"])
  @special_rules = @request_payload["specialRules"].map!{|rule| BSON::ObjectId(rule["_id"]["$oid"])}

  #JSON.parse(request.body.read.to_s)["specialRules"].each{|rule| puts BSON::ObjectId(rule["_id"]["$oid"])}
  #logger.info JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}

  # collection.update() when used with $set (as covered earlier) allows us to set single values
  # in this case, the put request body is converted to a string, rejecting keys with the name 'id' for security purposes
  #DB.collection(params[:thing]).update({'id' => tobsonid(params[:id])}, {'$set' => JSON.parse(request.body.read.tos).reject{|k,v| k == 'id'}})
  # Sin rewind da el error de "a JSON text must at least contain two octets" porque intenta parsear una request vacía...
  #request.body.rewind
  #UNITS.update({_id: BSON::ObjectId(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}})
  #UNITS.update({_id: @id}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}})
  UNITS.update({_id: @id}, {'$set' => @request_payload.reject{|k,v| k == '_id'}})
  #@special_rules.each{|rule| UNITS.update({_id: @id}, {'$addToSet' => {'specialRules' => BSON::ObjectId(rule["_id"]["$oid"])}}) }

  #UNITS.update({_id: BSON::ObjectId(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s)})

  # Devolver ok y body vacío, se supone que PUT es igual que POST. El body vacío evita que Angular vacié el
  # $resource al recibir la respuesta
  status 200
  body ''
end

post '/api/units' do
  # Probar > http://stackoverflow.com/questions/12131763/sinatra-controller-params-method-coming-in-empty-on-json-post-request
  #@json = JSON.parse(request.body.read)
  content_type :json
  oid = UNITS.insert(JSON.parse(request.body.read.to_s))
  logger.info "created unit #{oid}"
end

delete '/api/units/:id' do
  content_type :json
  logger.info "deleting unit: #{params[:id]}"
  #puts params[:id]
  #DB.collection('units').remove({_id: params[:id]})
  #UNITS.remove("name" => "test")
  @return = UNITS.remove({_id: BSON::ObjectId(params[:id])})

  puts @return
  #{:success => true}.to_json
  # Devolver ok y body vacío. El body vacío evita que Angular vacié el
  # $resource al recibir la respuesta y se supone que borra bien el item de la lista...
  status 200
  body ''
end

##

get '/api/rules' do
  #@rules = RULES.find.to_a.to_json
  #JSON.pretty_generate(@units)
  content_type :json
  @rules = RULES.find({}, {:fields => ["name"]}).to_a.to_json
end

get '/api/rules/:id' do
  content_type :json
  @rule = RULES.find_one({_id: BSON::ObjectId(params[:id])}).to_json
end

post '/api/rules' do
  # Probar > http://stackoverflow.com/questions/12131763/sinatra-controller-params-method-coming-in-empty-on-json-post-request
  #@json = JSON.parse(request.body.read)
  content_type :json
  oid = RULES.insert(JSON.parse(request.body.read.to_s))
  puts oid
end

delete '/api/rules/:id' do
  content_type :json
  id = BSON::ObjectId(params[:id])
  #UNITS.remove("name" => "test")

  # Quitar primero la referencia de la regla de las unidades que la contengan
  UNITS.update({specialRules: id}, {:$pull => {"specialRules" => id}}, :multi => true)
  # Después quitar la regla misma
  @return = RULES.remove({_id: id})

  {:success => true}.to_json
end

get '/api/weapons' do
  content_type :json
  @weapons = WEAPONS.find.to_a.to_json
end
