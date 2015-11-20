#!/usr/bin/env python

import json
import twitter
from utils import get_env_variable

class TweetEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, twitter.Status) or isinstance(obj, twitter.hashtag.Hashtag) or isinstance(obj, twitter.User) or isinstance(obj, twitter.url.Url):
			return obj.__dict__
		# Let the base class default method raise the TypeError
		return json.JSONEncoder.default(self, obj)

def get_tweets():
	"""
	returns twitter feed with settings as described below, contains all related twitter settings
	"""
	api = twitter.Api(consumer_key=get_env_variable('TWITTER_CONSUMER_KEY'),
					  consumer_secret=get_env_variable('TWITTER_CONSUMER_SERCRET'),
					  access_token_key=get_env_variable('TWITTER_ACCESS_TOKEN_KEY'),
					  access_token_secret=get_env_variable('TWITTER_ACCESS_TOKEN_SECRET'))

	return api.GetUserTimeline(screen_name='onekiloparsec', exclude_replies=True, include_rts=False)
	
def search_tweets(term=None, geocode=None, since_id=None, max_id=None, until=None, count=15, lang=None, locale=None, result_type='popular', include_entities=None):
	"""
	returns twitter feed with settings as described below, contains all related twitter settings
	"""
	api = twitter.Api(consumer_key=get_env_variable('TWITTER_CONSUMER_KEY'),
					  consumer_secret=get_env_variable('TWITTER_CONSUMER_SERCRET'),
					  access_token_key=get_env_variable('TWITTER_ACCESS_TOKEN_KEY'),
					  access_token_secret=get_env_variable('TWITTER_ACCESS_TOKEN_SECRET'))

	return api.GetSearch(term=term, geocode=geocode, since_id=since_id, max_id=max_id, until=until, 
						count=count, lang=lang, locale=locale, result_type=result_type, include_entities=include_entities)

	
if __name__ == "__main__":
	for tweet in search_tweets(term="#Tunisia", include_entities=True):
		print json.dumps(tweet, cls=TweetEncoder, sort_keys=True, indent=4)
		print '\n\n\n'
		
	
	
	
	
	