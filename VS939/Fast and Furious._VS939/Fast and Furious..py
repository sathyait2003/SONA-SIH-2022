# -*- coding: utf-8 -*-
"""26.08.2022.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1X2Oi6LNMxEaywT2lfwlKmksuL5jYiLb8
"""

pip install nltk

pip install newspaper3k

!pip install translate

# Commented out IPython magic to ensure Python compatibility.
# %%capture
# !pip install git+https://github.com/neuml/txtai#egg=txtai[pipeline]

# Commented out IPython magic to ensure Python compatibility.
# %%capture
# 
# from txtai.pipeline import Translation
# 
# # Create translation model
# translate = Translation()

#import the packages
from newspaper import Article
import random
import string
import numpy as np
import warnings 
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

#ignore the warnings
warnings.filterwarnings('ignore')

#download package from nltk
nltk.download('punkt',quiet=True)
nltk.download('wordnet',quiet=True)

#get artical url
article= Article('https://www.bitsathy.ac.in/')
article.download()
article.parse()
article.nlp()
corpus=article.text
#print
print(corpus)

#tokenization
text=corpus
sent_tokens=nltk.sent_tokenize(text)
print(sent_tokens)

#creating a dictionary to remove the punctuation
remove_punct_dict=dict( (ord(punct),None) for punct in string.punctuation)
print(string.punctuation)
print(remove_punct_dict)

#create a function to return lower case words 
def LemNormalize(text):
  return nltk.word_tokenize(text.lower().translate(remove_punct_dict))
print(LemNormalize(text))

#keywords for greetings
greeting_input=["hi","hello","hey","hola"]
greeting_response=["howdy","hey there","hi","hello :)"]
def greeting(sentence):
  for word in sentence.split():
    if word.lower() in greeting_input:
      return random.choice(greeting_response)

def response(user_response):
 #user response and robo responce
  #user_response="WHat is chronic disease"
  user_response=user_response.lower()
  #print(user_response)
  #robo response
  robo_response=''
  robo_response1=''
  sent_tokens.append(user_response)
  #print(sent_tokens)
  tfidfvec=TfidfVectorizer(tokenizer=LemNormalize , stop_words='english')
  tfidf=tfidfvec.fit_transform(sent_tokens)
  #print(tfidf)
  #get similarity score
  val=cosine_similarity(tfidf[-1],tfidf)
  #print(val)
  idx=val.argsort()[0][-2]
  flat=val.flatten()
  flat.sort()
  score=flat[-2]
  #print(score)
  if score==0:
    translation = translate("sorry. we will update the your question soon!!! \n", "en")
    translation1 = translate("sorry. we will update the your question soon!!! \n", "ta")
    translation2 = translate("sorry. we will update the your question soon!!! ", "hi")
    robo_response=robo_response+translation 
    robo_response=robo_response+translation1 
    robo_response=robo_response+translation2
  else:
    translation3 = translate(sent_tokens[idx], "en")
    translation4 = translate(sent_tokens[idx], "ta")
    translation5 = translate(sent_tokens[idx], "hi")
    robo_response=robo_response+translation3
    robo_response=robo_response+translation4
    robo_response=robo_response+translation5
    sent_tokens.remove(user_response)
  return robo_response

greeting_input=["hi","hello","hey","hola"]
greeting_response=["howdy","hey there","hi","hello :)"]
def greeting(sentence):
  for word in sentence.split():
    if word.lower() in greeting_input:
      return random.choice(greeting_response)
flag=True
print("hello!!! this is madmax,i can answer your queris related to light ,type bye to exit")
while(flag==True):
  user_response=input("cherry:")
  #user_response=user_response.lower()
  if(user_response!='bye'):
    if(user_response=='thanks' or user_response=='thank you'):
      flag=False
      print("madmax: anytime :)")
    else:
       if( greeting(user_response) != None):
         print("madmax: "+ greeting(user_response))
       else:
         print("madmax:"+response(user_response))
  else:
    flag=False
    print("madmax: see you later :)")



