import yake
import sys
# text = """
# We propose an architecture for VQA which utilizes recurrent layers to\ngenerate visual and textual attention. The memory characteristic of the\nproposed recurrent attention units offers a rich joint embedding of visual and\ntextual features and enables the model to reason relations between several\nparts of the image and question. Our single model outperforms the first place\nwinner on the VQA 1.0 dataset, performs within margin to the current\nstate-of-the-art ensemble model. We also experiment with replacing attention\nmechanisms in other state-of-the-art models with our implementation and show\nincreased accuracy. In both cases, our recurrent attention mechanism improves\nperformance in tasks requiring sequential or relational reasoning on the VQA\ndataset.
# """
def kw_extractor(full_text):    
    print("testing")
    kw = []
    custom_kw_extractor = yake.KeywordExtractor(n=1, top=3)
    keywords = custom_kw_extractor.extract_keywords(full_text)
    kw = list(dict(keywords).keys())
    return kw