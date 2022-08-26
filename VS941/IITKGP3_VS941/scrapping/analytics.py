import details
import json
import os
import sys

def main():
    dirs = ['./case_dir/Pending/', './case_dir/Disposed/']
    
    totalCases = 0
    caseCodeFrequency = {}
    diarynum = []
    for dir in dirs:
        # print(os.listdir(path=dir))
        years = os.listdir(path=dir)
        for year in years:
            # print(year)
            cases = os.listdir(path=dir+'/'+year)
            for case in cases:
                try:
                    with open(dir+'/'+year+'/'+case+'/Case_details.json', 'r') as f:
                        caseDetail = json.load(f)
                        f.close()
                    if not caseDetail['diary_number'] in diarynum:
                        diarynum.append(int(caseDetail['diary_number']))
                        totalCases += 1
                        if '-' in caseDetail['category'][:4]:    
                            if not caseDetail['category'][2:6] in caseCodeFrequency.keys():
                                caseCodeFrequency[caseDetail['category'][2:6]] = 0
                            caseCodeFrequency[caseDetail['category'][2:6]] += 1
                            if caseDetail['category'][2:6] == '':
                                print(dir+'/'+year+'/'+case)
                        if not caseDetail['category'][:4] in caseCodeFrequency.keys():
                            caseCodeFrequency[caseDetail['category'][:4]] = 0
                        caseCodeFrequency[caseDetail['category'][:4]] += 1
                        if caseDetail['category'][:4] == '':
                            print(dir+'/'+year+'/'+case)
                        if caseDetail['category'][:4] == '0-06':
                            print('category 9999')
                            print(dir+'/'+year+'/'+case)
                except:
                    print("Oops!", sys.exc_info()[0], "occurred.")
    
    totalCasesAnalysed = 0
    for key in caseCodeFrequency.keys():
        totalCasesAnalysed += caseCodeFrequency[key]
    print('total number of cases since 2008: ', totalCases)
    print('Total cases analysed: ', totalCasesAnalysed)
    print(caseCodeFrequency)
    
    with open('./analytics_data/case_code_frequency.json','w') as f:
        json.dump(caseCodeFrequency, f, ensure_ascii=False, indent=4)
            

if __name__ == '__main__':
    main()