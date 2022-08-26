import sys
import os
from details import *

def main():
    dirs= ['./case_dir/Pending/','./case_dir/Disposed/']
    with open('./analytics_data/advocateList.txt','r') as f:
        advocates = f.read()
        f.close()
    advocates = advocates.replace('{','')
    advocates = advocates.replace('}','')
    advocates = advocates.replace("'","")
    advocates = advocates.split(', ')
    
    advDetails = []
    
    for i in range(len(advocates)):
        adv = advocates[i]
        advDetails.append({})
        advDetails[i]['name'] = adv
        advDetails[i]['disposed_cases'] = 0
        advDetails[i]['pending_cases'] = 0
        # print(os.listdir(path=dir))
        years = os.listdir(path=dirs[0])
        for year in years:
            # print(year)
            cases = os.listdir(path=dirs[0]+'/'+year)
            for case in cases:
                try:
                    with open(dirs[0]+'/'+year+'/'+case+'/'+'Case_details.json','r') as f:
                        caseDetails = json.load(f)
                        f.close()
                    for resp_adv in caseDetails['resp_advocate']:
                        if adv in resp_adv:
                            advDetails[i]['disposed_cases'] += 1
                except:
                    print("Oops!", sys.exc_info()[0], "occurred.")
                    
        years = os.listdir(path=dirs[1])
        for year in years:
            # print(year)
            cases = os.listdir(path=dirs[1]+'/'+year)
            for case in cases:
                try:
                    with open(dirs[1]+'/'+year+'/'+case+'/'+'Case_details.json','r') as f:
                        caseDetails = json.load(f)
                        f.close()
                    for resp_adv in caseDetails['resp_advocate']:
                        if adv in resp_adv:
                            advDetails[i]['pending_cases'] += 1
                            print('success')
                except:
                    print(dirs[1]+'/'+year+'/'+case+'/')
                    print("Oops!", sys.exc_info()[0], "occurred.")

    with open('./analytics_data/Advocate_details.json','w') as f:
        json.dump(advDetails, f, ensure_ascii=False, indent=4)
                
if __name__ == '__main__':
      main()