import pickle

import sqlalchemy
from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

connection_string = 'postgresql://postgres:zjj1103@localhost:5432/postgres'
db = sqlalchemy.create_engine(connection_string)
engine = db.connect()
DB_Session = sessionmaker(bind=engine)
session = DB_Session()

Base = declarative_base()


#
# class Paper(Base):
#     __tablename__ = 'papers'
#     index = Column(String(), primary_key=True)
#     year = Column(String())
#     venue = Column(String())
#     title = Column(String())


class Citation(Base):
    __tablename__ = 'citations_v10'
    from_id = Column(String())
    to_id = Column(String())
    id = Column(Integer(), primary_key=True)


f = open('result_v10_3.pkl', 'rb')
results = pickle.load(f)

kkk = []
count = 0
for key, value in results.items():
    count += 1
    if count % 1000 == 0:
        print(count)
    kkk += [Citation(to_id=value['index'], from_id=r) for r in value['references']]
    if len(kkk) > 100000:
        session.add_all(kkk)
        kkk = []
        session.commit()
        # break

session.add_all(kkk)
kkk = []
session.commit()
