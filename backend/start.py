import tvdbsimple as tvdb
import sys
import json
tvdb.KEYS.API_KEY = 'UB0SOLRB8XH3I39L'
image_basepath = 'https://www.thetvdb.com/banners/'


def main(series_name):
    search = tvdb.Search()
    matched_names = search.series(series_name)
    y = json.dumps(matched_names)
    print(y)


if len(sys.argv) > 1:
    main(sys.argv[1])
else:
    blah = ''
