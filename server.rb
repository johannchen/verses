require 'sinatra'
require 'open-uri'
require 'json'

set :public_folder, File.dirname(__FILE__) + '/app'
get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

def esv_uri(passage) 
  passage = passage.gsub(/\s/, "+")
  passage = passage.gsub(/\:/, "%3A")
  passage = passage.gsub(/\,/, "%2C")
  options = ["include-short-copyright=0",
               "output-format=plain-text",
               "include-passage-horizontal-lines=0",
               "include-passage-references=0",
               "include-headings=0",
               "include-footnotes=0",
               "include-verse-numbers=0",
               "include-first-verse-numbers=0",
               "include-heading-horizontal-lines=0"].join("&")
  base_url = "http://www.esvapi.org/v2/rest/passageQuery?key=IP"

  base_url + "&passage=#{passage}&#{options}"
end

def esv_passage(passage)
  uri = esv_uri(passage)
  { ref: passage, esv: open(uri).read.strip }
end

get '/bible/:passage' do 
  content_type :json
  esv_passage(params[:passage]).to_json
end
