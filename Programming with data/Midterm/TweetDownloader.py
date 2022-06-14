# Import libraries and modules
import snscrape.modules.twitter as sntwitter
import pandas as pd
import time
import numpy as np
import json
import os
from datetime import datetime
from dateutil import parser

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer as SentimentAnalyzer
sentimentAnalyzer = SentimentAnalyzer()





#Scope Limits
StartTime = "2012-05-01"
EndTime = "2022-05-01"

# scope of a jump
JumpTriggerRatio = 1
JumpTriggerPercentage = 5
MinDaysBetweenJumps = 7

#scope of number of tweets
UsingHashTags = True
UsingPhrases = False


# caching folders
TweetCacheFolder = "CachedTweets"
StockCacheFolder = "CachedStockData"

#what users do we care about



def StrToDate(date):
	try:
		date = parser.parse(date)
	except:
		raise Exception("invalid date: " + str(date) + " Of type: " + str(type(date)))


	date = datetime(date.year, date.month, date.day)
	return date

def GetTweetSentiment(text):
	scores = sentimentAnalyzer.polarity_scores(text)
	return scores["compound"]


def GetTweetsFromAboutCompany(companyData, startTime, endTime, folder):

	startMark = time.time()
	if not os.path.isdir(folder):
		os.mkdir(folder)

	cachePath = os.path.join(folder, "tweets_" + companyData["StockName"] + ".csv")

	# cache exists
	if os.path.exists(cachePath):
		# df = pd.read_csv(cachePath)
		print("tweets already downloaded " + companyData["StockName"])

	else:
		# build the query
		query = "("

		twitterUsernames = companyData["TwitterUsernames"]
		twitterHashTags = companyData["TwitterHashTags"]
		twitterPhrases = companyData["TwitterPhrases"]

		for i in range(len(twitterUsernames)):
			query += "from:" + twitterUsernames[i]
			if i < len(twitterUsernames) - 1:
				query += " OR "

		if UsingHashTags:
			query += ") OR ("

			for i in range(len(twitterHashTags)):
				query += twitterHashTags[i]
				if i < len(twitterHashTags) - 1:
					query += " OR "

		if UsingPhrases:
			query += ") OR ("

			for i in range(len(twitterPhrases)):
				query += twitterPhrases[i]
				if i < len(twitterPhrases) - 1:
					query += " OR "

		query += ") since:" + startTime + " until:" + endTime + " -filter:links -filter:replies"

		print("start query")
		# get tweets that match the query
		tweets = []
		for tweet in sntwitter.TwitterSearchScraper(query).get_items():

			sentiment = GetTweetSentiment(tweet.content)
			tweets.append([tweet.date, tweet.user.username, tweet.content, tweet.replyCount, tweet.retweetCount, tweet.likeCount, tweet.quoteCount, tweet.id, sentiment])

			if len(tweets) % 1000 == 0:
				print(companyData["StockName"] + " tweets being downloaded: " + str(len(tweets)) + " Taken: " + str(time.time() - startMark))


		df = pd.DataFrame(tweets, columns=['Date', 'User', 'Content', 'ReplyCount', 'RetweetCount', 'LikeCount', 'QuoteCount', 'TweetID', 'Sentiment'])

		# to save to csv as a cache
		df.to_csv(cachePath)

	return


from threading import Thread
if __name__ == "__main__":

	with open("config.json", "r") as file:
		companiesToReview = json.load(file)


	for companyData in companiesToReview:
		print("Starting Thread to down load tweets")

		for i in range(10):
			startTime = str(2012 + i) + "-05-01"
			endTime = str(2013 + i) + "-05-01"
			folder = "CachedTweets_"+str(2012 + i)+"_"+str(2013 + i)
			thread = Thread(target = GetTweetsFromAboutCompany, args = (companyData, startTime, endTime, folder,))

			thread.start()

