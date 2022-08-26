import sys
import os
from unicodedata import category
from details import *

def main():
    dirs= ['./case_dir/Pending/','./case_dir/Disposed/']
    with open('./analytics_data/Advocate_details.json','r') as f:
        advocates = json.load(f)
        f.close()
    
    for i in range(len(advocates)):
        adv = advocates[i]
        advocates[i]['pending'] = {}
        advocates[i]['disposed'] = {}
        for dir in dirs:
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
                    except:
                        print("Oops!", sys.exc_info()[0], "occurred.")
                    for respAdv in caseDetails['resp_advocate']:
                        if adv['name'] in respAdv:
                            if dir == dirs[0]:
                                if caseDetails['category'][:4] not in advocates[i]['pending'].keys():
                                    advocates[i]['pending'][caseDetails['category'][:4]] = 0
                                advocates[i]['pending'][caseDetails['category'][:4]] += 1
                            if dir == dirs[1]:
                                if caseDetails['category'][:4] not in advocates[i]['disposed'].keys():
                                    advocates[i]['disposed'][caseDetails['category'][:4]] = 0
                                advocates[i]['disposed'][caseDetails['category'][:4]] += 1
    
    with open('./analytics_data/Advocate_details_with_case_category_code.json','w') as f:
        json.dump(advocates, f, ensure_ascii=False, indent=4)           
    
    advocatesWithCaseCategory = []
    with open('./analytics_data/case_category.json') as f:
        caseCategory = json.load(f)
        f.close()
    
    for i in range(len(advocates)):
        adv = advocates[i]
        advocatesWithCaseCategory.append({})
        advocatesWithCaseCategory[i]['name'] = adv['name']
        advocatesWithCaseCategory[i]['disposed_cases'] = adv['disposed_cases']
        advocatesWithCaseCategory[i]['pending_cases'] = adv['pending_cases']
        advocatesWithCaseCategory[i]['disposed'] = {}
        advocatesWithCaseCategory[i]['pending'] = {}
        for disp in adv['disposed'].keys():
            if caseCategory[disp]['Category'] not in advocatesWithCaseCategory[i]['disposed'].keys():
                advocatesWithCaseCategory[i]['disposed'][caseCategory[disp]['Category']] = 0    
            advocatesWithCaseCategory[i]['disposed'][caseCategory[disp]['Category']] += adv['disposed'][disp]
        for pend in adv['pending'].keys():
            if caseCategory[pend]['Category'] not in advocatesWithCaseCategory[i]['pending'].keys():
                advocatesWithCaseCategory[i]['pending'][caseCategory[pend]['Category']] = 0    
            advocatesWithCaseCategory[i]['pending'][caseCategory[pend]['Category']] += adv['pending'][pend]
    
    with open('./analytics_data/Advocate_details_with_case_category.json','w') as f:
        json.dump(advocatesWithCaseCategory, f, ensure_ascii=False, indent=4)
    
if __name__ == '__main__':
    main()
                
    