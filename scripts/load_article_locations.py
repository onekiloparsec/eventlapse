#!/Users/onekiloparsec/.virtualenvs/eventlapse-debug/bin/python
# -*- coding: utf-8 -*-

import os
import sys
import datetime
import json

sys.path.append(".")

import django
django.setup()

from project.eventlapse.models import *
from django.core.exceptions import ObjectDoesNotExist

with open('./scripts/export-locations.json', 'r') as f:
	data_rows = json.loads(f.read()) 
	for row in data_rows:
		identifier = row["article-id"]
		locations_list = row["locations"]
		
		if len(locations_list) > 0:	
			try:
				article = Article.objects.get(identifier=row["article-id"])
			except:
				print "No article for id: ", row["article-id"]
			else:
				for ll in locations_list:
					for l in ll:
						try:
							loc, created = Location.objects.get_or_create(name=l['name'], longitude=float(l['longitude']), latitude=float(l['latitude']))
						except: 
							pass
						else:
							print l
							article.locations.add(loc)							
				article.save()