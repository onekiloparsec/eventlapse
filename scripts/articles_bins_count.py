#!/Users/onekiloparsec/.virtualenvs/eventlapse-debug/bin/python
# -*- coding: utf-8 -*-

import os
import sys
import datetime

sys.path.append(".")

import django
django.setup()

from project.eventlapse.models import *
from django.core.exceptions import ObjectDoesNotExist

def enumerate_month_dates(start_date, end_date):
	current = start_date
	while current <= end_date:
		if current.month >= 12:
			next = datetime.datetime(current.year + 1, 1, 1)
		else:
			next = datetime.datetime(current.year, current.month + 1, 1)
		last = min(next - datetime.timedelta(1), end_date)
		yield current, last
		current = next

def enumerate_weeks_dates(start_date, end_date):
	current = start_date
	while current <= end_date:
		next = datetime.datetime(current.year, current.month, current.day) + datetime.timedelta(7)
		last = min(next, end_date)
		yield current, last
		current = next

def enumerate_days_dates(start_date, end_date):
	current = start_date
	while current <= end_date:
		next = datetime.datetime(current.year, current.month, current.day) + datetime.timedelta(1)
		last = min(next, end_date)
		yield current, last
		current = next

start_date = datetime.datetime(2010, 12, 01)
end_date = datetime.datetime(2016, 01, 01)

for start_date, end_date in enumerate_days_dates(start_date, end_date):
	articles = Article.objects.filter(date__gte=start_date, date__lt=end_date)
	delta = end_date-start_date
	print start_date, articles.count(), delta.days
	
	ac, created = ArticleCount.objects.get_or_create(start_date=start_date, end_date=end_date)
	ac.count = articles.count()
	ac.days = delta.days
	ac.save()
	
start_date = datetime.datetime(2010, 12, 01)
end_date = datetime.datetime(2016, 01, 01)
	
for start_date, end_date in enumerate_weeks_dates(start_date, end_date):
	articles = Article.objects.filter(date__gte=start_date, date__lt=end_date)
	delta = end_date-start_date
	print start_date, articles.count(), delta.days

	ac, created = ArticleCount.objects.get_or_create(start_date=start_date, end_date=end_date)
	ac.count = articles.count()
	ac.days = delta.days
	ac.save()
	