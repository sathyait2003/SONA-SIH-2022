from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

def search_keys(title):
    try:
        from googlesearch import search
    except ImportError:
        print("No module named 'google' found")

    example_sent = title
    
    stop_words = set(stopwords.words('english'))
    
    word_tokens = word_tokenize(example_sent)
    
    filtered_sentence = [w for w in word_tokens if not w.lower() in stop_words]
    
    filtered_sentence = []
    
    for w in word_tokens:
        if w not in stop_words:
            filtered_sentence.append(w)
    
    # print(word_tokens)
    # print(filtered_sentence)

    keywords_intext = word_tokens
    keywords_intext_intxt_q = ""
    i = len(keywords_intext)-1
    while(i!=0):
        keywords_intext_intxt_q = keywords_intext_intxt_q +" intext: " + keywords_intext[i] 
        i = i-1
    
    query = "-inurl: aicte -inurl: dst -inurl: ugc" + keywords_intext_intxt_q
    print(query)
    url_arr = []
    for j in search(query, tld="co.in", num=10, stop=10, pause=2):
        url_arr.append(j)
    return url_arr