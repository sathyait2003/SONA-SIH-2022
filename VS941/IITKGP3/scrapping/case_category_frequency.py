import json

with open('./analytics_data/case_category.json') as f:
    caseCategory = json.load(f)
    f.close()
    
with open('./analytics_data/case_code_frequency.json') as f:
    caseCodeFreq = json.load(f)
    f.close()
    
final = {}
for key in caseCodeFreq.keys():
    if key in caseCategory.keys():
        final[caseCategory[key]['Category']] = caseCodeFreq[key]
        
finalSum = 0
freqKaSum = 0

for key in caseCodeFreq.keys():
    freqKaSum += caseCodeFreq[key]
for key in final:
    finalSum += final[key]

with open('./analytics_data/case_category_freq.json', 'w') as f:
    json.dump(final,f,ensure_ascii=False, indent=4)

print('final sum: ', finalSum)
print('freq ka sum: ', freqKaSum)