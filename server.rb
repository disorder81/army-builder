require 'sinatra'
require 'sinatra/reloader' if development?
require 'mongo'

=begin
  public folder: carpeta para ficheros estáticos. No es necesario
  incluirlo en las rutas, se asume que esa es la carpeta para
  recursos estático. Se puede cambiar en configure con:
  :public_folder, File.dirname(__FILE__) + '/custom_location'
=end

configure do
  CONNECTION 		= Mongo::Connection.from_uri('mongodb://test:test@ds043158.mongolab.com:43158/heroku_app17961664')
  DB 				= CONNECTION.db("heroku_app17961664")
  #ARMIES			= DB["armies"]
  UNITS 			= DB["units"]
  #WEAPONS 		= DB["weapons"]
  #SPECIAL_RULES 	= DB["special_rules"]
#  set :haml, :format => :html5
end

get '/units' do
  @units = UNITS.find
end

# Verbo 'url' behavior (opcional?)
get '/' do
  "----"
end

# Array de rutas
['/one','/two','/three'].each do |route|
  get route do
    "Triggered #{route} via GET"
  end

  post route do
    "Triggered #{route} via POST"
  end

  put route do
    "Triggered #{route} via PUT"
  end

  delete route do
    "Triggered #{route} via DELETE"
  end

  patch route do
    "Triggered #{route} via PATCH"
  end
end

# Rutas con parámetros. Los parámetros van en el array params
get '/:name' do
  "Hello, #{params[:name]}!"
end

# Cuando se envían datos vía POST no hace falta definir el parámetro
# ya van directamente en el params.
post '/login' do                                                       s
  username = params[:username]
  password = params[:password]
end

put '/users/:id' do
  u = User.find(params[:id])
  u.first_name = params[:first_name]
  u.last_name = params[:last_name]
  u.save
end

# Parámetros en la url. Por ejemplo /some_name?foo=XYZ
get '/:name' do
  "You asked for #{params[:name]} as well as #{params[:foo]}"
end

# Wildcard. Se almacena en params[:splat] que a su vez contiene un array
# Esto es greedy
get '/*' do
  "You passed in #{params[:splat]}"
end

# First sufficient match approach.
# El primer patrón que cumple la url es el que se ejecuta,
# aunque por debajo haya alguno más específico
get '/*' do
  "NOM NOM NOM"
end

get '/specific' do
  "You'll never ever see me"
end

# Regex
get %r{/(sp|gr)eedy} do
  "You got caught in the greedy route!"
end

get '/speedy' do
  "No one calls me :("
end

get '/greedy' do
  "No one calls me either!"
end

# Halting a Request
get '/halt' do
  'You will not see this output'.
  halt 500
end

# Passing a request

# Redirecting a request