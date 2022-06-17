# Import libraries and modules
import pandas as pd
import json
import os

with open("config.json", "r") as file:
	companiesToReview = json.load(file)

for companyData in companiesToReview:
		print("Starting Thread to down load tweets")

		yearsData = []
		for i in range(10):
			startTime = str(2012 + i) + "-05-01"
			endTime = str(2013 + i) + "-05-01"
			folder = "CachedTweets_"+str(2012 + i)+"_"+str(2013 + i)

			cachePath = os.path.join("Large_TweetCache", folder, "tweets_" + companyData["StockName"] + "_Compressed.csv")

			yearsData.append(pd.read_csv(cachePath))

		joinedDf = pd.concat(yearsData, axis=0)

		cachePath = os.path.join("CachedTweets_Large", "tweets_" + companyData["StockName"] + "_Large.csv")
		joinedDf.to_csv(cachePath)