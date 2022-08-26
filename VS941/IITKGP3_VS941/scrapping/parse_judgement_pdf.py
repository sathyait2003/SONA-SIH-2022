import json
import os
import sys, fitz
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
                print(dir+'/'+year+'/'+case)
                with open(dir+'/'+year+'/'+case+'/Case_details.json') as f:
                    caseDetails = json.load(f)
                
                try:
                    fname = dir+'/'+year+'/'+case + '/Judgement.pdf'# get document filename
                    doc = fitz.open(fname)  # open document
                    out = open(fname + ".txt", "wb")  # open text output
                    for page in doc:  # iterate the document pages
                        text = page.get_text().encode("utf8")  # get plain text (is in UTF-8)
                        out.write(text)  # write text of page
                        out.write(bytes((12,)))  # write page delimiter (form feed 0x0C)
                        # print(text)
                    out.close()
                    with open(dir+'/'+year+'/'+case+'/result.json','w') as f:
                        if 'dismissed' in str(text).lower():
                            print('UGC WON!!')
                            json.dump({caseDetails['diary_number'] : 1},f,ensure_ascii=False, indent=4)
                        elif 'granted' or 'allowed' in str(text).lower():
                            print('UGC lost')
                            json.dump({caseDetails['diary_number'] : 0},f,ensure_ascii=False, indent=4)
                        else:
                            print('UGC won!!')
                            json.dump({caseDetails['diary_number'] : 1},f,ensure_ascii=False, indent=4)
                    # exit()
                except:
                    print("Oops!", sys.exc_info()[0], "occurred.", " for Judgement.pdf")





if __name__ == '__main__':
      main()