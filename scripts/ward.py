#!/usr/bin/env python
import re
import subprocess
from time import sleep
import json
import os

here = os.path.dirname(__file__) 

macAddrs = [] #list of mac adresses connected now

def monitor(process): #monitors the process, if it spends many seconts with no output we kill it
	while True:
		status = process.poll()
		if status is not None: #process ended, so should we
			break
		out, _ = process.communicate()
		if not out:
			process.terminate()
			break
		filter(out) #we have new data to process
		sleep(5) #wait to poll again process stdout

def filter(data): #filter program output to get only desired info
	matches = re.findall("([0-9.]{7,15})\s([\w:]{17})", data)
	for match in matches:
		macAddrs.append({'ip':match[0], 'macaddr':match[1]})

arpScan = subprocess.Popen('sudo arp-scan -I wlan0 -l -O ' + here + '/ieee-oui.txt', shell=True, stdout=subprocess.PIPE)

monitor(arpScan)

print "------Scan Done------"

json = json.dumps(macAddrs)

print "-----Calling JS------"

subprocess.call([here + "/updateOnlineNow.js", json])
