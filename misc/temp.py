import pickle

import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

connection_string = 'postgresql://postgres@localhost:32768/postgres'
db = sqlalchemy.create_engine(connection_string)
engine = db.connect()
DB_Session = sessionmaker(bind=engine)
session = DB_Session()

Base = declarative_base()


class Paper(Base):
    __tablename__ = 'papers_v10'
    index = Column(String(), primary_key=True)
    year = Column(String())
    venue = Column(String())
    title = Column(String())


f = open('result_v10_1.pkl', 'rb')
results = pickle.load(f)

kkk = []
count = 0
for key, value in results.items():
    count += 1
    if count % 1000 == 0:
        print(count)
    kkk.append(Paper(index=value['index'], venue=value['venue'], year=value['year'], title=value['paper_title']))
    if len(kkk) >= 100000:
        session.add_all(kkk)
        kkk = []
        session.commit()
        # break
