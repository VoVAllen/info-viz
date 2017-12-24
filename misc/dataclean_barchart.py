import csv
import json
from collections import defaultdict, OrderedDict

f = open('../rank2.csv', 'r')
# f2 = open('viz2_total.json', 'r')
# total_count=json.load(f2)
# f2 = open('../paper_counts.csv','r')
reader = csv.reader(f)
dic = defaultdict(OrderedDict)
# header = reader.next()a
# print(header)
for i, row in enumerate(reader):
    if i == 0: continue
    # original_year,cites_year = int(row[2]), int(row[0])
    years, venue, title, count, rank = row
    years = int(years)
    count = int(count)
    rank = int(rank)
    if years<2000:continue
    if not (years in dic[venue]):
        dic[venue][years] = OrderedDict()
    dic[venue][years][rank] = {
        'title': title,
        'year': years,
        'count': count,
        'rank': rank,
        'venue': venue
    }

print(json.dumps(dic))
json.dump(dic, open('barchart.json', 'w'))
