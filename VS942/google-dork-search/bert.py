from sklearn.metrics.pairwise import cosine_similarity

data = ""

with open('abstract.txt', 'r') as file:
    data = file.read().replace('\n', ' ')

def bert_sim(entered_abs_text):
    sen = [
        entered_abs_text,
        data
    ]

    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer('bert-base-nli-mean-tokens')
    #Encoding:
    sen_embeddings = model.encode(sen)

    # print(sen_embeddings.shape)
    list_data = []
    list_data.append(cosine_similarity([sen_embeddings[0]],sen_embeddings[1:]))
    return round(list_data[0][0][0] * 100)
