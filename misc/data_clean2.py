import csv
import json
from collections import defaultdict

f = open('count_table.csv', 'r')
reader = csv.reader(f)
dic = defaultdict(list)
for i, row in enumerate(reader):
    if i == 0: continue
    print(row)
    years = int(row[0])
    venue = row[1]
    count = int(row[2])
    if years < 2000: continue
    dic[years].append(dict(years=years, venue=venue, count=count))
    # break
print(dic)
f2 = open("rrr2.json", 'w')
json.dump(dic, f2)
