import sys
import os
from details import *

def main():
    dirs= ['./case_dir/Disposed/']
    advocateList = []
    for dir in dirs:
        # print(os.listdir(path=dir))
        years = os.listdir(path=dir)
        for year in years:
            # print(year)
            cases = os.listdir(path=dir+'/'+year)
            for case in cases:
                try:
                    with open(dir+'/'+year+'/'+case+'/'+'Case_details.json','r') as f:
                        caseDetails = json.load(f)
                        f.close()
                    for adv in caseDetails['resp_advocate']:
                        advocateList.append(adv)
                except:
                    print("Oops!", sys.exc_info()[0], "occurred.")
    # print(advocateList)
    for i in range(len(advocateList)):
        if '[' in advocateList[i]:
            advocateList[i] = advocateList[i].split('[')[0]
        advocateList[i].replace('а','')
    # print(advocateList)
    
    uniqueAdv = set()
    for adv in advocateList:
        if adv != '':
            uniqueAdv.add(adv)
        
    print(uniqueAdv)
    with open('./analytics_data/advocateList.txt','w') as f:
        f.write(str(uniqueAdv))
                
if __name__ == '__main__':
      main()