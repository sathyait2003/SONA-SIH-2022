import json
import os
import sys
import requests
import codecs

def main():
    # dirs= ['./case_dir/Pending/', './case_dir/Disposed/']
    dirs = ['./case_dir/Disposed']
    for dir in dirs:
        # print(os.listdir(path=dir))
        years = os.listdir(path=dir)
        for year in years:
            # print(year)
            cases = os.listdir(path=dir+'/'+year)
            for case in cases:
                # print(os.listdir(path=dir+'/'+year+'/'+case))
                try:
                    print(dir+'/'+year+'/'+case)
                    with open(dir+'/'+year+'/'+case+'/Judgement.json', 'r') as f:
                        judgement = json.load(f)
                    # print(judgement)
                    res = requests.get(judgement[list(judgement.keys())[0]])
                    # with codecs.open(dir+'/'+year+'/'+case+'/Judgement.pdf', 'wb', encoding='utf8') as f:
                    #     f.write(res.text)
                    with open(dir+'/'+year+'/'+case+'/Judgement.pdf', 'wb') as f:
                        f.write(res.content)
                except:
                    print("Oops!", sys.exc_info()[0], "occurred.", " for Judgement.html")
                
            
if __name__ == '__main__':
      main()