#!/usr/bin/env python

import twitter
from utils import get_env_variable

def get_tweets():
	"""
	returns twitter feed with settings as described below, contains all related twitter settings
	"""
	api = twitter.Api(consumer_key=get_env_variable('TWITTER_CONSUMER_KEY'),
					  consumer_secret=get_env_variable('TWITTER_CONSUMER_SERCRET'),
					  access_token_key=get_env_variable('TWITTER_ACCESS_TOKEN_KEY'),
					  access_token_secret=get_env_variable('TWITTER_ACCESS_TOKEN_SECRET'))

	return api.GetUserTimeline(screen_name='onekiloparsec', exclude_replies=True, include_rts=False)
	
	
if __name__ == "__main__":
	for tweet in get_tweets():
		print tweet.text
		
		
	
	
	
	