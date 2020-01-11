import sys
from os import listdir
from os.path import isfile, join, isdir
from os import rename
from os import getcwd
import tvdbsimple as tvdb
import json

tvdb.KEYS.API_KEY = 'UB0SOLRB8XH3I39L'
validfiles = []
invalidfiles = []
dirlist = []
validpreview =[]

class sfilenames:
    def __init__(self, episodenumber, filename, extension):
        self.extension = extension
        self.filename = filename
        self.episodenumber = episodenumber

class preview:
    def __init__(self, isvalid, src, dst):
        self.isvalid = isvalid
        self.src = src
        self.dst = dst

def main(path=getcwd()):
    """
    does all the operations in steps
    :param path:
    :return:
    """
    scanfolder(path)
    match_filename(sys.argv[1])
    directorylist(path)
    print(json.dumps(validpreview, default=obj_to_dict))
    return

def obj_to_dict(obj):
    return obj.__dict__

def directorylist(path):
    """scans directory for sub directories"""
    onlyfiles = [f for f in listdir('.') if isdir(join('.', f))]
    for f in onlyfiles:
        validpreview.append(preview(False, 'Dir-'+str(f), 'Dir-'+str(f)))
    return

def scanfolder(path):
    """
    scans the folder for files with extensions.mkv.mp4 etc and stores all the feasable cadidates.
    :param path:
    :return:
    """
    """need to go into config file supported extensions"""
    exts = ['.mkv', '.mp4', '.avi', '.flv', '.mpg', '.mpeg', '.wmv', '.webm', '.vob', '.mov', '.3gp', '.ogv']
    allfiles = [f for f in listdir(path) if isfile(join('.', f))]
    for file in allfiles:
        if getextension(file) in exts:
            if not file.replace(getextension(file), '').isnumeric():
                validpreview.append(preview(False, str(file), str(file)))
            else:
                try:
                    validfiles.append(
                        sfilenames(int(file.replace(getextension(file), '')), str(file), getextension(file)))
                except:
                    continue

        else:
            validpreview.append(preview(False, str(file), str(file)))

    return


def getextension(filename):
    """
    uses file name to get extension
    :param filename:
    :return:
    """
    a = filename.rfind('.')
    return filename[a:]



def match_filename(seriesid):
    """
    get filenames from tv_db and match them with local filenames and save them for confirmation.
    :param filename:
    :return:
    """
    show = tvdb.Series(seriesid)
    info = show.info()
    title = info['seriesName']
    episodes = tvdb.Series_Episodes(seriesid).all()
    for s in episodes:
        for k in validfiles:
            try:
                if s['absoluteNumber'] == k.episodenumber:
                    outfilename = make_filename(title, s['airedSeason'], s['airedEpisodeNumber'],
                                                s['episodeName'],
                                                s['absoluteNumber'])
                    validpreview.append(preview(True, k.filename, outfilename+k.extension))             
            except IOError:
                print(IOError)
                continue

    return


def removeNonAscii(s): return "".join(i for i in s if ord(i) < 128)


def make_filename(seriesname, seasonnumber, seasonepisode, episodename, episodenumber):
    """
    this is used to make filename as per the format
    :return:
    """
    name = [str(removeNonAscii(seriesname)), ' Ep-', str(episodenumber), ' S', str(seasonnumber), 'E', str(seasonepisode), ' -',
            str(removeNonAscii(episodename))]

    finalname = ''.join(name)

    return finalname.replace(':', '!').replace('?', '')


if len(sys.argv) > 1:
    main()
else:
    blah = ''
