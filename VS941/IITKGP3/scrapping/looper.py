import sys
import os
from details import *

def main():
      # dirs= ['./case_dir/Disposed']
      dirs= ['./case_dir/Pending/', './case_dir/Disposed/']
      for dir in dirs:
            print(os.listdir(path=dir))
            years = os.listdir(path=dir)
            for year in years:
                  print(year)
                  cases = os.listdir(path=dir+'/'+year)
                  for case in cases:
                        # print(os.listdir(path=dir+'/'+year+'/'+case))
                        print(dir+'/'+year+'/'+case)
                        try:
                              extract(dir+'/'+year+'/'+case+'/'+'Case_details.html', basedir=dir+'/'+year+'/'+case+'/')
                        except:
                              print("Oops!", sys.exc_info()[0], "occurred.", " for Case_details.html")
                        try:
                              html_to_json_listing_dates(dir+'/'+year+'/'+case+'/'+'Listing_dates.html', basedir=dir+'/'+year+'/'+case+'/')
                        except:
                              print("Oops!", sys.exc_info()[0], "occurred.", " for Listing_dates.html")
                        try:
                              html_to_json_earlier_courts(dir+'/'+year+'/'+case+'/'+'Earlier_courts.html', basedir=dir+'/'+year+'/'+case+'/')
                        except:
                              print("Oops!", sys.exc_info()[0], "occurred.", " for Earlier_courts.html")
                        try:
                              html_to_json_il_applications(dir+'/'+year+'/'+case+'/'+'Inter_locutary_applications.html', basedir=dir+'/'+year+'/'+case+'/')
                        except:
                              print("Oops!", sys.exc_info()[0], "occurred.", " for Inter_locutary_applications.html")
                        # try:
                        #       html_to_json_notices(dir+'/'+year+'/'+case+'/'+'Notices.html', basedir=dir+'/'+year+'/'+case+'/')
                        # except:
                        #       print("Oops!", sys.exc_info()[0], "occurred.", " for Notices.html")
                        try:
                              html_to_json_tagged_matters(dir+'/'+year+'/'+case+'/'+'Tagged_matters.html', basedir=dir+'/'+year+'/'+case+'/')
                        except:
                              print("Oops!", sys.exc_info()[0], "occurred.", " for Tagged_matters.html")
                        try:
                              html_to_json_judgements(dir+'/'+year+'/'+case+'/'+'Judgement.html', basedir=dir+'/'+year+'/'+case+'/')
                        except:
                              print("Oops!", sys.exc_info()[0], "occurred.", " for Judgement.html")
                        # exit()
                        
            # extract(path='./case_dir/Pending/2020/1/Case_details.html', basedir='./case_dir/Pending/2020/1/')

if __name__ == '__main__':
      main()
