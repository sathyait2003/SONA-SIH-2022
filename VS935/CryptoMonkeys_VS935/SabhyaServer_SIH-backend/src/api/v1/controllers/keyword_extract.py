import yake
import sys
text = """
A large black mongrel named Rowf and a white terrier named Snitter escape from an animal experiment center in England's Lake District and, aided by a cunning fox, learn to live on their own, until rumors of slaughtered sheep and bubonic plague-carrying dogs transform them into fugitives. Reprint. 15,000 first printing.
"""
def kw_extractor():
    kw = []
    custom_kw_extractor = yake.KeywordExtractor(n=1, top=3)
    keywords = custom_kw_extractor.extract_keywords(text)
    kw = list(dict(keywords).keys())
    print(kw)


kw_extractor()