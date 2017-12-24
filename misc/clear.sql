SELECT *
FROM papers_v10
WHERE venue='european conference on computer vision' and years=2011;

SELECT p2.years as cites_year,p1.venue,p1.years as original_year,count(*)
INTO viz2
FROM papers_v10 as p1
JOIN citations_v10 as c on p1.index=c.original_paper
  JOIN papers_v10 as p2 on c.cites=p2.index
WHERE p1.venue in ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                  'Journal of Machine Learning Research',
                  'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                  'knowledge discovery and data mining',
                  'International Journal of Computer Vision',
                  'international joint conference on artificial intelligence')
and p1.years>2000
  and p2.years>2000
GROUP BY p1.years,p2.years,p1.venue;

SELECT years,venue,count(*)
FROM papers_v10
WHERE venue in ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                  'Journal of Machine Learning Research',
                  'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                  'knowledge discovery and data mining',
                  'International Journal of Computer Vision',
                  'international joint conference on artificial intelligence')
GROUP BY venue,years;


SELECT *
FROM citations_v10 as c
join papers_v10 as p on c.original_paper=p.index
WHERE p.venue='international joint conference on artificial intelligence';


-- 111
SELECT count(*)
FROM papers_v10
WHERE venue = 'neural information processing systems';


SELECT *
FROM papers_v10
WHERE papers_v10.years LIKE '%Recurrent %';
-- WHERE venue = 'CVPR';


SELECT venue AS from_venue
FROM citations
  JOIN papers ON citations.from_id = papers.index;

SELECT
  pp.venue,
  count(pp.venue)
FROM papers_v10 AS pp
WHERE pp.index IN (SELECT c.cites
                   FROM citations_v10 AS c
                     JOIN papers_v10 AS p ON c.original_paper = p.index
                   WHERE p.venue = 'neural information processing systems')
GROUP BY venue
ORDER BY count(pp.venue) DESC;

SELECT
  pp.years,
  pp.venue,
  count(*)
FROM papers_v10 AS pp
WHERE pp.index IN (SELECT c.original_paper
                   FROM citations_v10 AS c
                     JOIN papers_v10 AS p ON c.cites = p.index
                   WHERE p.venue = 'neural information processing systems')
GROUP BY venue, years
HAVING venue NOTNULL
ORDER BY count(*) DESC;


ALTER TABLE citations_v10
  SET LOGGED;

SELECT count(venue)
FROM papers_v10
HAVING count(venue) > 100;


COPY papers_v10
FROM 'E:\NYUSH\Fall2017\Info Viz\project\result3.csv' DELIMITER ',' CSV HEADER;

COPY citations_v10
FROM 'E:\NYUSH\Fall2017\Info Viz\project\result_c4.csv' DELIMITER ',' CSV HEADER;

COPY citations_v10
FROM 'E:\NYUSH\Fall2017\Info Viz\project\result_c3.csv' DELIMITER ',' CSV HEADER;

COPY citations_v10
FROM 'E:\NYUSH\Fall2017\Info Viz\project\result_c2.csv' DELIMITER ',' CSV HEADER;

COPY citations_v10
FROM 'E:\NYUSH\Fall2017\Info Viz\project\result_c1.csv' DELIMITER ',' CSV HEADER;

SELECT count(*)
FROM papers_v10;
SELECT count(*)
FROM citations_v10;

CREATE INDEX papers_v10_index_index
  ON public.papers_v10 (index);

CREATE INDEX citations_v10_cites_index
  ON public.citations_v10 (cites);

SELECT
  p2.years,
  p.venue  AS cites,
  p2.venue AS original,
  count(*)
INTO cit_table
FROM citations_v10 AS c
  JOIN papers_v10 AS p ON c.cites = p.index
  JOIN papers_v10 AS p2 ON c.original_paper = p2.index
WHERE p.venue IN ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                  'Journal of Machine Learning Research',
                  'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                  'knowledge discovery and data mining',
                  'International Journal of Computer Vision',
                  'international joint conference on artificial intelligence'
) AND p2.venue IN ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                   'Journal of Machine Learning Research',
                   'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                   'knowledge discovery and data mining',
                   'International Journal of Computer Vision',
                   'international joint conference on artificial intelligence'
)
GROUP BY p2.years, p.venue, p2.venue

SELECT
  p.years  AS o_years,
  p2.years AS c_years,
  p.venue  AS o_venue,
  count(*)
INTO viz2k
FROM citations_v10 AS c
  JOIN papers_v10 AS p ON c.original_paper = p.index
  JOIN papers_v10 AS p2 ON c.cites = p2.index
WHERE p.years > 2000
      AND p2.years > 2000
      AND p2.years >= p.years
  AND p.venue in  ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                  'Journal of Machine Learning Research',
                  'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                  'knowledge discovery and data mining',
                  'International Journal of Computer Vision',
                  'international joint conference on artificial intelligence'
)
GROUP BY o_years, c_years, o_venue
-- GROUP BY years,p.venue;
-- p.venue='International Journal of Computer Vision'
--   and

-- 222
SELECT *
FROM papers_v10
WHERE venue='european conference on computer vision' and years=2011;

SELECT p2.years as cites_year,p1.venue,p1.years as original_year,count(*)
INTO viz2
FROM papers_v10 as p1
JOIN citations_v10 as c on p1.index=c.original_paper
  JOIN papers_v10 as p2 on c.cites=p2.index
WHERE p1.venue in ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                  'Journal of Machine Learning Research',
                  'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                  'knowledge discovery and data mining',
                  'International Journal of Computer Vision',
                  'international joint conference on artificial intelligence')
and p1.years>2000
  and p2.years>2000
GROUP BY p1.years,p2.years,p1.venue;

SELECT years,venue,count(*)
FROM papers_v10
WHERE venue in ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                  'Journal of Machine Learning Research',
                  'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                  'knowledge discovery and data mining',
                  'International Journal of Computer Vision',
                  'international joint conference on artificial intelligence')
GROUP BY venue,years;
-- 333
SELECT
  years,
  venue,
  count(*)
into count_table
FROM papers_v10 as p
WHERE venue IN ('neural information processing systems'
  , 'computer vision and pattern recognition'
  , 'international conference on computer vision'
  , 'european conference on computer vision',
                  'Journal of Machine Learning Research',
                  'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                  'knowledge discovery and data mining',
                  'International Journal of Computer Vision',
                  'international joint conference on artificial intelligence')
and p.years>2000
GROUP BY venue,years
