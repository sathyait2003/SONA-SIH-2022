from asyncore import read
import json
import os
import sys, fitz
import requests
import codecs

def main():
    # dirs= ['./case_dir/Pending/', './case_dir/Disposed/']
    dirs = ['./case_dir/Disposed']
    readVal = {}
    for dir in dirs:
        # print(os.listdir(path=dir))
        years = os.listdir(path=dir)
        for year in years:
            # print(year)
            cases = os.listdir(path=dir+'/'+year)
            for case in cases:
                print(dir+'/'+year+'/'+case)
                try:
                    with open(dir+'/'+year+'/'+case+'/result.json','r') as f:
                        temp = json.load(f)
                        f.close()
                    for key in temp.keys():
                        readVal[key] = temp[key]
                except:
                    print("Oops!", sys.exc_info()[0], "occurred.", " for disposed_judgement.json")
                    
    with open('./analytics_data/disposed_judgement.json', 'w') as f:
        json.dump(readVal,f,ensure_ascii=False, indent=4)
        f.close()
                
                

if __name__ == '__main__':
      main()
