import os
import requests
import sys
from bs4 import BeautifulSoup
host = 'https://main.sci.gov.in'
URLS = [
    host + '/case-status',
    host + '/php/captcha_num.php',
    host + '/php/getPartyDetails.php'
]

def makeSoup(method,urlList,header,data={}):
    soupList = []
    if method == 'get':
        for url in urlList:
            res = requests.get(url,headers=header)
            soupList += BeautifulSoup(res.text,'lxml')
    if method == 'post':
        for url in urlList:
            res = requests.post(url,headers=header,data=data)
            soupList+=BeautifulSoup(res.text,'lxml')
    return soupList
    

def checkStatus(code):
    if code not in [200, 302]:
        sys.exit('Error: ' + str(code))

def whatever_after(i):
    if i%10 in [1, 2, 3]:
        a = ['st','nd','rd']
        return a[i%10 - 1]
    return 'th'
def main():
    r0 = requests.get(URLS[0])
    checkStatus(r0.status_code)
    print("Cookie : " + r0.headers['Set-Cookie'])
    
    # headers for getting captcha
    headers = {'Cookie': r0.headers['Set-Cookie'],
               'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}

    r1 = requests.post(URLS[1], headers=headers)
    checkStatus(r1.status_code)
    year = 2022
    while(year>=2008):
        data = {
            'PartyName': 'University Grants Commission',
            'PartyYear': year,
            'PartyStatus': 'D',
            'page': 1,
            'ansCaptcha': r1.text,
            'PartyType': ''
        }
        print(data['ansCaptcha'])
        
        # headers for getting case status after solving captcha
        headers = {
            'Cookie': r0.headers['Set-Cookie'],
            'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                'Connection': 'keep-alive',
                'Content-Length': '101',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Host': 'main.sci.gov.in',
                'Origin': 'https://main.sci.gov.in',
                'Referer': 'https://main.sci.gov.in/case-status',
                'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': "Linux",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47',
                'X-Requested-With': 'XMLHttpRequest',
                }
        r2 = requests.post(URLS[2], data=data, headers=headers)
        checkStatus(r2.status_code)
        
        soup = BeautifulSoup(r2.text, 'lxml')
        link_tag = soup.select('a.colorbox-inline')
        # for link in link_tag:
        #     print(link)
        # exit()
        # headers for extracting link for each case
        headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US;q = 0.7',
            'Connection': 'keep-alive',
            'Cookie': r0.headers['Set-Cookie'],
            'Host': 'main.sci.gov.in',
            'Referer': 'https://main.sci.gov.in/case-status',
            'Sec-Fetch-Dest': 'iframe',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-GPC': '1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36'
        }
        
        caseDetailSoupList = []
        for link in link_tag:
            print(host+str(link['href']))
            case = requests.get(host+str(link['href']),headers=headers)
            caseDetailSoupList += BeautifulSoup(case.text,'lxml')
        
        diaryNo = []
        for soup in caseDetailSoupList:
            diaryNo.append(soup.find(id='diaryno')['value'])
            # print(soup.find(id='diaryno')['value'])
        
        caseDetailSoup = {}
        for i in range(len(diaryNo)):
            caseDetailSoup[diaryNo[i]] = caseDetailSoupList[i]
        
        judgementSoup = {} 
        earlierCourtSoup = {}
        listingDatesSoup ={}
        noticesSoup = {}
        interLocutaryApplications = {}
        taggedMatters = {}
        for num in diaryNo:    
            headersForJudgement = {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'Content-Length': '16',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': r0.headers['Set-Cookie'],
                'Host': 'main.sci.gov.in',
                'Origin': 'https://main.sci.gov.in',
                'Referer': host+str(link_tag[i]['href']),
                'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': "Windows",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-GPC': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
            res = requests.post('https://main.sci.gov.in/php/case_status/get_judgement_order.php', data={'diaryno': num},headers=headersForJudgement)
            judgementSoup[num] = BeautifulSoup(res.text, 'lxml')
            res2 = requests.post('https://main.sci.gov.in/php/case_status/get_earlier_court.php', data={'diaryno': num},headers=headersForJudgement)
            earlierCourtSoup[num] = BeautifulSoup(res2.text, 'lxml')
            res3 = requests.post('https://main.sci.gov.in/php/case_status/get_listings.php',data={'diaryno': num}, headers=headersForJudgement)
            listingDatesSoup[num] = BeautifulSoup(res3.text, 'lxml')    
            res4 = requests.post('https://main.sci.gov.in/php/case_status/get_notices.php',data={'diaryno': num},headers=headersForJudgement)
            noticesSoup[num] = BeautifulSoup(res4.text, 'lxml')
            interLocutaryApplications[num] = requests.post('https://main.sci.gov.in/php/case_status/get_ia.php', data={'diaryno': num},headers=headersForJudgement).text
            taggedMatters[num] = requests.post('https://main.sci.gov.in/php/case_status/get_connected.php', data={'diaryno': num},headers=headersForJudgement).text
            # print(res5.text)
            # exit()
        
        # exit('exited as said')
        # Case dir structure:
        #     Pending:
        #         Year:
        #             S.no.:
        #               Case_details.html
        #               Judgements.html
        #               Earlier_court_details.html
        #               Listing_dates.html
        #               Notices.html
        #     Disposed:
        #         Year:
        #             S.no.:
        #               Case_details.html
        #               Judgements.html
        #                Earlier_court_details.html
        #                Listing_dates.html
        #                Notices.html
        curDirPath = os.getcwd()
        caseDir = os.path.join(curDirPath,'case_dir')
        if(data['PartyStatus'] == 'P'):
            caseDir = os.path.join(caseDir,'Pending')
        if(data['PartyStatus'] == 'D'):
            caseDir = os.path.join(caseDir,'Disposed')
        if(not os.path.exists(caseDir)):
            os.mkdir(caseDir)
        # print(caseDir)
        
        yearDirPath = os.path.join(caseDir,str(year))
        if(not os.path.exists(yearDirPath)):
            os.mkdir(yearDirPath)
        print(len(link_tag))
        print(len(caseDetailSoup))
        print(len(judgementSoup))
        print(len(earlierCourtSoup))
        print(len(diaryNo))
        print(len(listingDatesSoup))
        print(len(noticesSoup))
        # for soup in earlierCourtSoup:
        #     print(type(soup))
        
        i = 1
        for num in diaryNo:
            try:
                print(f'Saving {i}{whatever_after(i)} case of year {year}...')
                caseNumPath = os.path.join(yearDirPath,str(i))
                if(not os.path.exists(caseNumPath)):
                    os.mkdir(caseNumPath)
                # print(caseNumPath)
                with open(os.path.join(caseNumPath,'Case_details.html'),'w') as file:
                    file.write(str(caseDetailSoup[num]))
                    file.close()
                with open(os.path.join(caseNumPath,'Judgement.html'),'w') as file:
                    file.write(str(judgementSoup[num]))
                    file.close()
                with open(os.path.join(caseNumPath,'Earlier_courts.html'),'w') as file:
                    file.write(str(earlierCourtSoup[num]))
                    file.close()
                with open(os.path.join(caseNumPath,'Listing_dates.html'),'w') as file:
                    file.write(str(listingDatesSoup[num]))
                    file.close()
                with open(os.path.join(caseNumPath,'Notices.html'),'w') as file:
                    file.write(str(noticesSoup[num]))
                    file.close()
                with open(os.path.join(caseNumPath,'Inter_locutary_applications.html'),'w') as file:
                    try:
                        file.write(interLocutaryApplications[num])
                    except:
                        print('could not save interlocutary applications data')
                    file.close()
                with open(os.path.join(caseNumPath,'Tagged_matters.html'),'w') as file:
                    try:
                        file.write(taggedMatters[num])
                    except:
                        print('could not save tagged matters data')
                        print(sys.exc_info()[0], "occurred.")
                    file.close()
                print(f'Saved!!')
            except:
                print("Oops!", sys.exc_info()[0], "occurred.")
            i += 1
        # i = 1
        # for s in judgementSoup:
        #     caseNumPath = os.path.join(yearDirPath,str(i))
        #     if(not os.path.exists(caseNumPath)):
        #         os.mkdir(caseNumPath)
        #     # print(caseNumPath)
        #     with open(os.path.join(caseNumPath,'Judgements.html'),'w') as file:
        #         file.write(str(s))
        #         file.close()
        #     i+=1
            
        year -= 1

        
    

        
if __name__ == '__main__':
    main()
