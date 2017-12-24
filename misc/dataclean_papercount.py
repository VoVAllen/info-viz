import csv
import json
from collections import defaultdict, OrderedDict

f = open('../paper_counts.csv','r')
reader = csv.reader(f, )
dic = defaultdict(OrderedDict)
header = next(reader)
print(header)
for i, row in enumerate(reader):
    years = int(row[0])
    venue = row[1]
    count = int(row[2])

    # if not(years in dic[venue]):
    #     dic[venue]={}
    if ((venue=='computer vision and pattern recognition') & (years==2001)):
        print(111)
    dic[venue][years]=count
    # nnn = dic[venue]
    # nnn[original_year] = count
    # dic[venue] = nnn
print(dic['computer vision and pattern recognition'][2001])

print(json.dumps(dic))
json.dump(dic, open('viz2_total.json', 'w'))
