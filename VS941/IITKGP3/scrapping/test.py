from calendar import c
from functools import total_ordering
import os
from details import *
import json


def main():
    html_to_json_judgements('./case_dir/Disposed/2022/1/Judgement.html','./case_dir/Disposed/2022/1/')
    
if __name__ == '__main__':
    main()
