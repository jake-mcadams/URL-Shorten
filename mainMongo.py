import numpy as np
import pymongo
import pandas as pd
import matplotlib.pyplot as plt

client = pymongo.MongoClient("mongodb://localhost:27017/")

dbList = client.list_database_names()

if "urlShortener" in dbList:
    print("DB exists")
else:
    print("url database does not exist. Please create database")
    
useDB = client["urlShortener"]

useCol = useDB["shorturls"]

dataFind = useCol.find()
dbCount = useCol.count_documents({"full": "https://testspace.com"})

# countFilter = {"full": "https://testspace.com"}


# get count based on url
def dbCounting(col, filter={}):
    result = col.count_documents(filter)
    return str(result)

# list for url tracking to prevent duplicates
urlList = []

# function to return one record found per url
def urlCounting(col, url=""):
    if url in urlList:
        pass
    else:
        result = col.find_one({"full": url})
        urlList.append(url)
        return str(result)

# creating empty list to pass in mongo collection
dictList = []

# 
for x in dataFind:
    dictList.append(x)

# creating dataframe
df = pd.DataFrame(dictList)

# print(urlCounting(useCol, "https://spacespace.com"))
    
# finding url and counts then returning to screen
for x in df['full']:
    countFilter = {"full": x}
    urlResult = urlCounting(useCol, x)
    if urlResult is not None:
        print(x + ': ' + dbCounting(useCol, countFilter))
    else:
        pass
    
#returnning plots axi by url count
def urlCountAxis():
     pass
    

# setting plot points
xpoints = np.array([1,5])
ypoints = np.array([1, 6])

# plotting
plt.plot(xpoints, ypoints)

plt.show()