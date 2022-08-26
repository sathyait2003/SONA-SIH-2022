from bs4 import BeautifulSoup
import re
import unicodedata
import json


MATCH_ALL = r'.*'


def like(string):
    """
    Return a compiled regular expression that matches the given
    string with any prefix and postfix, e.g. if string = "hello",
    the returned regex matches r".*hello.*"
    """
    string_ = string
    if not isinstance(string_, str):
        string_ = str(string_)
    regex = MATCH_ALL + re.escape(string_) + MATCH_ALL
    return re.compile(regex, flags=re.DOTALL)


def find_by_text(soup, text, tag, **kwargs):
    """
    Find the tag in soup that matches all provided kwargs, and contains the
    text.

    If no match is found, return None.
    If more than one match is found, raise ValueError.
    """
    elements = soup.find_all(tag, **kwargs)
    matches = []
    for element in elements:
        if element.find(text=like(text)):
            matches.append(element)
    if len(matches) > 1:
        raise ValueError("Too many matches:\n" + "\n".join(matches))
    elif len(matches) == 0:
        return None
    else:
        return matches[0]
# Now, when I want to find the element above, I just run find_by_text(soup, 'Edit', 'a', href='/customer-menu/1/accounts/1/update')

def remove_first_x_words_and_last_y_words(string, x, y):
      """
      Remove the first x words and last y words from the string.
      """
      words = string.split()
      return " ".join(words[x:len(words) - y])
#     """
#     Return a string with the first n words removed.
#     .split(' ', 3)[3]
#     """
#     words = string.split()
#     return " ".join(words[x:])
def extract(path, basedir):
      with open(path, 'rb') as f:

            contents = f.read()

            soup = BeautifulSoup(contents, 'lxml')
            diary_number = soup.select("input#diaryno")[0].get('value') if len(soup.select("input#diaryno")) > 0 else ''

            filed_on =  remove_first_x_words_and_last_y_words(find_by_text(soup, 'Filed on', 'div', width="100%").contents[1] if find_by_text(soup, 'Filed on', 'div', width="100%") else '', 2,0)
            slp_no = remove_first_x_words_and_last_y_words(unicodedata.normalize('NFKD',find_by_text(soup, 'SLP(C) No', 'div', width="100%").contents[0] if find_by_text(soup, 'SLP(C) No', 'div', width="100%") else ''), 2,3)
            registered_on = remove_first_x_words_and_last_y_words(unicodedata.normalize('NFKD',find_by_text(soup, 'Registered on', 'div', width="100%").contents[0] if find_by_text(soup, 'Registered on', 'div', width="100%") else ''), 9,0)
            if registered_on == '':
                  registered_on = remove_first_x_words_and_last_y_words(unicodedata.normalize('NFKD',find_by_text(soup, 'Registered on', 'div', width="100%").contents[0] if find_by_text(soup, 'Registered on', 'div', width="100%") else ''), 8,0)
            if registered_on == '':
                  registered_on = remove_first_x_words_and_last_y_words(unicodedata.normalize('NFKD',find_by_text(soup, 'Registered on', 'div', width="100%").contents[0] if find_by_text(soup, 'Registered on', 'div', width="100%") else ''), 7,0)
            # print(registered_on == "")
            verified_on = remove_first_x_words_and_last_y_words(unicodedata.normalize('NFKD',find_by_text(soup, 'Verified On', 'div', width="100%").contents[2] if find_by_text(soup, 'Verified On', 'div', width="100%") else ''), 2,0)[:-1]
            last_date_judges = find_by_text(soup, 'Present/Last Listed On', 'td', width="140px").next_sibling.next_sibling.contents if find_by_text(soup, 'Present/Last Listed On', 'td', width="140px") else ''
            present_last_listed_on = last_date_judges[0].contents[0].contents[0] if last_date_judges and len(last_date_judges)!=0 and len(last_date_judges[0].contents)>=3 else ''
            last_hearing_judges = last_date_judges[0].contents[2].contents[0] if last_date_judges and len(last_date_judges)!=0 and len(last_date_judges[0].contents)>=3 else ''
            status = find_by_text(soup, 'Status/Stage', 'td', width="140px").next_sibling.next_sibling.contents[0].contents if find_by_text(soup, 'Status/Stage', 'td', width="140px") else ''
            status = [str(s) for s in status if str(s) != '<br/>']
            status = " ".join(status)
            tentative_date = find_by_text(soup, 'Tentatively case may be listed on', 'td').next_sibling.next_sibling.contents[0].contents[0] if find_by_text(soup, 'Tentatively case may be listed on', 'td', width="140px") else ""
            if len(find_by_text(soup, 'Category', 'td', width="140px").next_sibling.next_sibling.contents) == 0:
                category = ''
            else:
                category= find_by_text(soup, 'Category', 'td', width="140px").next_sibling.next_sibling.contents[0] if find_by_text(soup, 'Category', 'td', width="140px") else ''
            act = find_by_text(soup, 'Act', 'td', width="140px").next_sibling.next_sibling.contents[0] if find_by_text(soup, 'Act', 'td', width="140px") and len(find_by_text(soup, 'Act', 'td', width="140px").next_sibling.next_sibling.contents)!=0 else ''
            petitioner = find_by_text(soup, 'Petitioner(s)', 'td', width="140px").next_sibling.next_sibling.contents if find_by_text(soup, 'Petitioner(s)', 'td', width="140px") else ''
            # print("petitioner = ",petitioner)
            petitioner = [unicodedata.normalize('NFKD' ,s.contents[0]).strip().split(' ', 1)[1] for s in petitioner]
            respondents = find_by_text(soup, 'Respondent(s)', 'td', width="140px").next_sibling.next_sibling.contents if find_by_text(soup, 'Respondent(s)', 'td', width="140px") else ''
            respondents = [unicodedata.normalize('NFKD' ,s.contents[0]).strip().split(' ', 1)[1] if len(unicodedata.normalize('NFKD' ,s.contents[0]).strip().split(' ', 1)) == 2 else ''for s in respondents] 
            pet_advocate = find_by_text(soup, 'Pet. Advocate(s)', 'td', width="140px").next_sibling.next_sibling.contents if find_by_text(soup, 'Pet. Advocate(s)', 'td', width="140px") else ''
            pet_advocate = [unicodedata.normalize('NFKD' ,s.contents[0] if s.contents else "").strip().split(' ', 1)[1] if len(unicodedata.normalize('NFKD' ,s.contents[0] if s.contents else "").strip().split(' ', 1))==2 else "" for s in pet_advocate]
            resp_advocate = find_by_text(soup, 'Resp. Advocate(s)', 'td', width="140px").next_sibling.next_sibling.contents if find_by_text(soup, 'Resp. Advocate(s)', 'td', width="140px") else ''
            resp_advocate = [unicodedata.normalize('NFKD',s.contents[0]).strip() for s in resp_advocate]
            u_section = find_by_text(soup, 'U/Section', 'td', width="140px").next_sibling.next_sibling.contents[0] if find_by_text(soup, 'U/Section', 'td', width="140px") and len(find_by_text(soup, 'U/Section', 'td', width="140px").next_sibling.next_sibling.contents)!=0 else ''
            # print(resp_advocate)
            if registered_on == "":
                  print("registered_on is empty")
                  print("dir = ", path)
            data = {
                  'diary_number': diary_number,
                  'filed_on': filed_on,
                  'slp_no': slp_no,
                  'registered_on': registered_on,
                  'verified_on': verified_on,
                  'last_listed_on': present_last_listed_on,
                  'last_hearing_judges': last_hearing_judges,
                  'status': status,
                  'tentative_date': tentative_date,
                  'category': category,
                  'act': act,
                  'petitioner': petitioner,
                  'respondents': respondents,
                  'pet_advocate': pet_advocate,
                  'resp_advocate': resp_advocate,
                  'u_section': u_section
            }
            json_object = json.dumps(data, indent = 4) 

      with open(basedir+'Case_details.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
    #   print(json_object)
    
def html_to_json_listing_dates(path, basedir):    
    with open(path, 'rb') as f:
        contents = f.read()
        if len(contents.split()) == 0:
            f.close()
            return None
        f.close()
    soup = BeautifulSoup(contents, 'lxml')
    # print(html_to_json(str(soup)))
    rows = soup.find_all('tr')
    # print(soup.prettify)
    # print(rows)
    # headingRow = soup.find('tr')
    headingRow = soup.find('tr')
    # print(headingRow)
    headingRow = headingRow.find_all('td')
    headings = []
    for heading in headingRow:
        headings.append(heading.text)
    # print(headings)
    
    rows = soup.find_all('tr')
    rows.pop(0)
    data = []
    for i in range(len(rows)):
        row = BeautifulSoup(str(rows[i]), 'lxml')
        cells = row.find_all('td')
        data.append({})
        for j in range(len(headings)):
            data[i][headings[j]] = cells[j].text
            # print(cells[j])
    # print(data)
    
    with open(basedir+'Listing_dates.json','w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def html_to_json_il_applications(path, basedir):    
    with open(path, 'rb') as f:
        contents = f.read()
        f.close()
    soup = BeautifulSoup(contents, 'lxml')
    tables = soup.find_all('table')    
    data = {}
    for table in tables:
        table = BeautifulSoup(str(table), 'lxml')
        rows = table.find_all('tr')
        title = rows.pop(0).text.replace('\n','')
        data[title] = {}
        
        headingRow = rows[0]
        headingRow = BeautifulSoup(str(headingRow),'lxml')
        headingRow = headingRow.find_all('th')
        headings = []
        for heading in headingRow:
            headings.append(heading.text)
        rows.pop(0)
        for j in range(len(rows)):
            data[title][j] = {}
            row = BeautifulSoup(str(rows[j]),'lxml')
            cells = row.find_all('td')
            for i in range(len(cells)):
                data[title][j][headings[i]] = cells[i].text
                # print(cells[i].text)
    # print(data)
    # exit()
    
    with open(basedir+'Inter_locutary_applications.json','w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def html_to_json_earlier_courts(path, basedir):    
    with open(path, 'r') as f:
        contents = f.read()
        if len(contents.split()) == 0:
            f.close()
            return None
        f.close()
    
    contents = contents.replace('\n','')
    soup = BeautifulSoup(contents, 'lxml')
    rows = soup.find_all('tr')
    # headingRow = soup.find('tr')
    headingRow = soup.find('tr')
    headingRow = headingRow.find_all('th')
    headings = []
    for heading in headingRow:
        # print(heading.text.strip())
        headings.append(heading.text.strip())
    
    # exit()
    rows = soup.find_all('tr')
    rows.pop(0)
    data = []
    for i in range(len(rows)):
        row = BeautifulSoup(str(rows[i]), 'lxml')
        cells = row.find_all('td')
        data.append({})
        for j in range(len(headings)):
            data[i][headings[j]] = cells[j].text.strip()
            # print(cells[j])
    # print(data)
    
    with open(basedir+'Ealier_courts.json','w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def html_to_json_notices(path, basedir):    
    with open(path, 'r') as f:
        contents = f.read()
        if len(contents.split()) == 0:
            f.close()
            return None
        f.close()
    
    contents = contents.replace('\n','')
    soup = BeautifulSoup(contents, 'lxml')
    rows = soup.find_all('tr')
    # headingRow = soup.find('tr')
    headingRow = soup.find('tr')
    headingRow = headingRow.find_all('th')
    headings = []
    for heading in headingRow:
        # print(heading.text.strip())
        headings.append(heading.text.strip())
    
    # exit()
    rows = soup.find_all('tr')
    rows.pop(0)
    data = []
    for i in range(len(rows)):
        row = BeautifulSoup(str(rows[i]), 'lxml')
        cells = row.find_all('td')
        data.append({})
        for j in range(len(headings)):
            data[i][headings[j]] = cells[j].text.strip()
            # print(cells[j])
    # print(data)
    
    with open(basedir+'Notices.json','w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def html_to_json_tagged_matters(path, basedir):    
    with open(path, 'r') as f:
        contents = f.read()
        if len(contents.split()) == 0:
            f.close()
            return None
        f.close()
    
    soup = BeautifulSoup(contents,'lxml')
    table = soup.find('table')
    if table == None:
        return None
    headingsRow = table.find('tr')
    headingsRow = headingsRow.findAll('th')
    headings = []
    for heading in headingsRow:
        headings.append(heading.text.strip())
    
    rows = table.findAll('tr')
    rows.pop(0)
    data = {}
    
    for i in range(len(rows)):
        data[i] = {}
        row = BeautifulSoup(str(rows[i]))
        row = row.findAll('td')
        for j in range(len(row)):
            cell = row[j]
            data[i][headings[j]] = cell.text.strip()
            
    with open(basedir+'Tagged_matters.json','w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def html_to_json_judgements(path,basedir):
    with open(path,'r') as f:
        contents = f.read()
        f.close()
    baseURL = 'https://main.sci.gov.in'
    soup = BeautifulSoup(contents,'lxml')
    a = soup.findAll('a')
    data = {}
    for link in a:
        link = BeautifulSoup(str(link),'lxml')
        link = link.find('a')
        data[link.text] = baseURL + link['href']
        
    with open(basedir+'Judgement.json','w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)