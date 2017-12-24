import pickle
import json

# file = open("DBLPOnlyCitationOct19.txt", encoding='UTF-8')
file = open("dblp-ref/dblp-ref-3.json", encoding='UTF-8')

records = dict()
for i, line in enumerate(file.readlines()):
    if i%1000==0:
        print(i)
    dic = json.loads(line)
    # print(dic)
    records[dic["id"]] = {
        'paper_title': dic['title'],
        'index': dic["id"],
        'venue': dic["venue"],
        'references': dic.get('references', ""),
        'year': dic['year']
    }

with open("result_v10_4.pkl", 'wb') as f:
    pickle.dump(records, f)
# print(records)
#     if line.startswith('c'):
