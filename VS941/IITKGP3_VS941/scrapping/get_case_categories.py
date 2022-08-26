import json
import requests
from bs4 import BeautifulSoup

def main():
    header = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.7',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'BNI_persistence=NUIffASvAES-Jfr7DCxSQMtFVHFbIE1c9pth3xH4rA1jUKtiDGvBUg0z-lEWCRTcSfIuUWPWSAqd_uVdJtAGFw==; SERVERID=php_130_88; has_js=1; SESS3e237ce09ea0ff0fb3e315573005c968=Rw5EGGCyeiQ94S_DHqIJROKuyErnjZhtkWcZp3E1etc',
        'Host': 'main.sci.gov.in',
        'If-Modified-Since': 'Thu, 25 Aug 2022 07:27:39 GMT',
        'Referer': 'https://main.sci.gov.in/case-status',
        'Sec-Fetch-Dest': 'document',
        "Sec-Fetch-Mode": 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Sec-GPC': '1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36'
    }
    content = requests.get('https://main.sci.gov.in/case-category', headers=header)
    
    soup = BeautifulSoup(content.text,'lxml')
    table = soup.find_all('table', class_='mobview')
    # print(tables)
    # numberOfTables = 0
    # for table in tables:
    #     table = BeautifulSoup(str(table),'lxml')
    #     numberOfTables += 1
    # print(f'number of tables: {numberOfTables}')
    
    table.pop(0)
    # print(table)
    # with open('case_code.html','w') as f:
    #     f.write(str(table))
    
    
    table = BeautifulSoup(str(table),'lxml')
    headings = table.findAll('th')
    headingTitle = []
    for heading in headings:
        headingTitle.append(heading.text.strip())
    
    rows = table.findAll('tr')
    
    caseCategory = {}
    for row in rows:
        row = BeautifulSoup(str(row),'lxml')
        row = row.findAll('td')
        data = []
        for cell in row:
            data.append(str(cell.text.strip()))
        # print(data)
        # print(data[0])
        if data:
            caseCategory[data[0]] = {}
            caseCategory[data[0]][headingTitle[1]] = data[1]
            caseCategory[data[0]][headingTitle[2]] = data[2]
    with open('./analytics_data/case_category.json','w') as f:
        json.dump(caseCategory, f, ensure_ascii=False, indent=4)
        
    print(caseCategory['0317'])
    
    
    
if __name__ == '__main__':
    main()