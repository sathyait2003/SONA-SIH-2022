import pandas as pd
import numpy as np
import tensorflow as tf
from transformers import DistilBertTokenizer, TFDistilBertModel
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
bert = TFDistilBertModel.from_pretrained("distilbert-base-uncased")

texts = """
One of the challenges facing artificial intelligence research today is
designing systems capable of utilizing systematic reasoning to generalize to
new tasks. The Abstraction and Reasoning Corpus (ARC) measures such a
capability through a set of visual reasoning tasks. In this paper we report
incremental progress on ARC and lay the foundations for two approaches to
abstraction and reasoning not based in brute-force search. We first apply an
existing program synthesis system called DreamCoder to create symbolic
abstractions out of tasks solved so far, and show hoolw it enables solving of
progressively more challenging ARC tasks. Second, we design a reasoning
algorithm motivated by the way humans approach ARC. Our algorithm constructs a
search graph and reasons over this graph structure to discover task solutions.
More specifically, we extend existing execution-guided program synthesis
approaches with deductive reasoning based on function inverse semantics to
enable a neural-guided bidirectional search algorithm. We demonstrate the
effectiveness of the algorithm on three domains: ARC, 24-Game tasks, and a
'double-and-add' arithmetic puzzle.
"""
encoded_dict = {'Ethics':0,'Machine Learning':1,'Deep Learning':2,
                'Artificial Intelligence':3,'DSA':4,'Business':5,
                'Science':6,'Cryptography':7,'CS Fundamentals':8,
                'Web Dev':9,'App Dev':10,'Technology':11,'Others':12}

model = tf.keras.models.load_model('ML\my_model.h5', custom_objects={'TFDistilBertModel': TFDistilBertModel})

def predict_topic(Description):
    x_val = tokenizer(
    text=Description,
    add_special_tokens=True,
    max_length=100,
    truncation=True,
    padding='max_length', 
    return_tensors='tf',
    return_token_type_ids = False,
    return_attention_mask = True,
    verbose = True) 
    validation = model.predict({'input_ids':x_val['input_ids'],'attention_mask':x_val['attention_mask']})*100
    results = []
    validation[0].sort()
    for key , value in zip(encoded_dict.keys(),validation[0][-3:]):
        results.append(key)
    return results

print(predict_topic(texts))