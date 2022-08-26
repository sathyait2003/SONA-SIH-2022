import json
import os
import sys

with open('./analytics_data/Advocate_details_with_case_category.json', 'r') as f:
    advocates = json.load(f)
    f.close()

totalAdvocates = 0
totalPendingCases = 0
totalDisposedCases = 0


dirs = ['./case_dir/Pending/', './case_dir/Disposed/']
for dir in dirs:
    years = os.listdir(path=dir)
    for year in years:
        cases = os.listdir(path=dir+'/'+year)
        for case in cases:
            if dir == dirs[0]:
                totalPendingCases += 1
            if dir == dirs[1]:
                totalDisposedCases += 1

for adv in advocates:
    totalAdvocates += 1

print('Total disposed cases: ', totalDisposedCases)
print('Total pending cases: ', totalPendingCases)
print('Total cases: ', totalPendingCases + totalDisposedCases)
print('Total advocates: ', totalAdvocates)

mdict = {
    'total_advocates': totalAdvocates,
    'total_pending_cases': totalPendingCases,
    'total_disposed_cases': totalDisposedCases,
    'total_cases' : totalPendingCases + totalDisposedCases
}

with open('./analytics_data/total_number_of_cases.json', 'w') as f:
    json.dump(mdict, f, ensure_ascii=False, indent=4)