import csv
import json
from collections import defaultdict

f = open('postgres_public_cit_table.csv', 'r')
reader = csv.reader(f, )
dic = defaultdict(list)
for i, row in enumerate(reader):
    if i == 0: continue
    print(row)
    years = int(row[0])
    cites = row[1]
    original = row[2]
    count = int(row[3])
    if years < 2000: continue
    dic[years].append(dict(years=years, cites=cites, original=original, count=count))
    # break
print(dic)
f2 = open("rrr.json", 'w')
json.dump(dic, f2)
