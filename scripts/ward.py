#!/usr/bin/python
import re
import subprocess
from time import sleep

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
	matches = re.findall("([\w:?]{17})", data)
	for match in matches:
		macAddrs.append(match)

arpScan = subprocess.Popen('sudo arp-scan -I wlan0 -l -O ieee-oui.txt', shell=True, stdout=subprocess.PIPE)

monitor(arpScan)

print macAddrs
print "------Scan Done------"
