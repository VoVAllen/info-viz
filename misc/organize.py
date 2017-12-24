import pickle

# file = open("DBLPOnlyCitationOct19.txt", encoding='UTF-8')
file = open("test.txt", encoding='UTF-8')

records = dict()

references = []

for i, line in enumerate(file.readlines()):
    if line == '\n':
        records[index] = {
            'paper_title': paper_title,
            'index': index,
            'venue': venue,
            'references': references,
            'year': year
        }

        references = []
    if i % 100000 == 0:
        print(i)
        # break
    if line.startswith("#*"):
        paper_title = line.replace("#*", "").strip()
    elif line.startswith("#index"):
        index = line.replace("#index", "").strip()
    elif line.startswith("#c"):
        venue = line.replace("#c", "").strip()
    elif line.startswith("#%"):
        references.append(line.replace("#%", "").strip())
    elif line.startswith("#t"):
        year = line.replace("#t", "").strip()

with open("result111.pkl", 'wb') as f:
    pickle.dump(records, f)
# print(records)
#     if line.startswith('c'):
