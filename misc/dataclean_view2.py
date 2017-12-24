import csv
import json
from collections import defaultdict, OrderedDict

f = open('../viz2k.csv', 'r')
f2 = open('viz2_total.json', 'r')
total_count=json.load(f2)
# f2 = open('../paper_counts.csv','r')
reader = csv.reader(f, )
dic = defaultdict(OrderedDict)
header = next(reader)
print(header)
for i, row in enumerate(reader):
    # original_year,cites_year = int(row[2]), int(row[0])
    cites_year,original_year = int(row[2]), int(row[1])
    # cites_year =
    count = int(row[3])
    venue = row[0]
    if cites_year < original_year: continue
    print(row)
    print(venue)
    if not (original_year in dic[venue]):
        dic[venue][original_year] = [0 for i in range(2017 - original_year)]
    tt= total_count[venue][str(cites_year)]
    dic[venue][original_year][cites_year - original_year-1] = float(count)/tt
    # nnn = dic[venue]
    # nnn[original_year] = count
    # dic[venue] = nnn
# print(dic['IEEE Transactions on Pattern Analysis and Machine Intelligence'][2013])

print(json.dumps(dic))
json.dump(dic, open('viz2.json', 'w'))
