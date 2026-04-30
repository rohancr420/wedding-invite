import urllib.request
import re

url = 'https://docs.google.com/forms/d/e/1FAIpQLSdJ0RW5e1PHSVHgT_3Hrk1tbynkCGRBInycDQB2Zw2h0Vk2gA/viewform?usp=publish-editor'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

for match in re.finditer(r'\[\d+,"(.*?)",null,\d+,\[\[(\d+)', html):
    print(f'Question: {match.group(1)} -> entry.{match.group(2)}')
