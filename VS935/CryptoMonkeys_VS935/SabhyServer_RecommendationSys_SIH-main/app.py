import imp
import json
from flask import Flask,request
import yake
import sys
from ML.model import get_tfidf, get_kw, get_data, get_interests
from ML.keyword_extraction import kw_extractor
from ML.topic_prediction import predict_topic
import requests

app = Flask(__name__)
app.debug = True

f = open("ML\data\dataset.json")
json_file = json.load(f)

@app.route("/",methods=[ "GET"])
def test():
    return 'ml api running sucessfully'

@app.route("/testing",methods=[ "POST"])
def testing():
    data = request.get_json()['data']
    print(data)
    return 'testing working fine'


@app.route("/keywords_extraction",methods=[ "POST"])
def keywrod_extraction():
    desc = request.get_json()['desc']    
    kwy_words = kw_extractor(desc);
    topics = predict_topic(desc);
    return {kwy_words}

# @app.route("/interests",methods=[ "POST"])
# def interests():
#     desc = request.get_json()['desc']
#     # name = request.get_json()['name']    
#     get_tfidf()
#     return kwy_words

@app.route("/recommendation",methods=[ "GET"])
def recommend_by_us(): 
    user = "58lhsejmgw"
    kw_list, desc_list, id_list, int_list = get_data(json_file)
    indices = get_interests(user, 10)
    return indices

if __name__ == '__main__':
    app.run(host="localhost", port=8085)