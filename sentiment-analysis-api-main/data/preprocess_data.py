import numpy as np
import pandas as pd 
import tensorflow as tf
import nltk
import seaborn as sns
import re
import matplotlib.pyplot as plt
import pickle
from tensorflow.keras.layers import Embedding, Dense, LSTM, Dropout, Bidirectional
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.text import one_hot, Tokenizer
from tensorflow.keras.callbacks import ModelCheckpoint
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


df=pd.read_csv('model/Emotion_final.csv') #Text data
EMBEDDING_FILE= f'model/glove.6B.100d.txt' #GloVe file path


#removing duplicated values
index = df[df.duplicated() == True].index
df.drop(index, axis = 0, inplace = True)
df.reset_index(inplace=True, drop = True)

#removing duplicated text 
index = df[df['Text'].duplicated() == True].index
df.drop(index, axis = 0, inplace = True)
df.reset_index(inplace=True, drop = True)

df=df.dropna() #Drop columns with NA values
X=df.drop('Emotion',axis=1) #Taking Text
y=df['Emotion'] #Taking Emotion

messages=X.copy()
messages.reset_index(inplace=True) #Drop NA may cause inconsistency in index

stopword_lst = pickle.load(open('/home/devraj4522/Desktop/ML Model/model/stopwords.pkl', 'rb'))

# nltk.download('stopwords')
ps = PorterStemmer()  # reduce word to root form
corpus = []
for i in range(0, len(messages)):
    review = re.sub('[^a-zA-Z]', ' ', messages['Text'][i]) #Remove Special Characters
    review = review.lower() #Lower case 
    review = review.split()
    review = [ps.stem(word) for word in review if not word in stopword_lst] #Remove stopwords
    review = ' '.join(review)
    corpus.append(review)
    
    
with open("corpus.pkl", 'wb') as file:
    pickle.dump(corpus, file)


with open("ps.pkl", 'wb') as file:
    pickle.dump(ps, file)
    

#Creating the dictionary with word as key and pretrained-value array as value
def get_coefs(word,*arr): return word, np.asarray(arr, dtype='float32')
embeddings_index = dict(get_coefs(*o.strip().split()) for o in open(EMBEDDING_FILE))
all_embs = np.stack(embeddings_index.values())
emb_mean,emb_std = all_embs.mean(), all_embs.std()

voc_size=10000 # Vocabulary size
embed_size=100 #word vector size

tokenizer = Tokenizer(num_words=voc_size)
tokenizer.fit_on_texts(list(corpus))
word_index = tokenizer.word_index #Total words in the corpus
nb_words = min(voc_size, len(word_index))

#Initialize weight matrix for embedding layer
embedding_matrix = np.random.normal(emb_mean, emb_std, (nb_words, embed_size)) 

for word, i in word_index.items():
    if i >= voc_size: continue #Skip the words if vocab size is reached
    embedding_vector = embeddings_index.get(word) #Extract the pretrained values from GloVe
    if embedding_vector is not None: embedding_matrix[i] = embedding_vector
    
# #One hot representation for input
onehot_repr=[one_hot(words,voc_size)for words in corpus]

# #Finding max words
l = 0
for x in corpus:
    l = max(l,len(x.split(' ')))

# #Padding the sequences for input
sent_length= l
embedded_docs=pad_sequences(onehot_repr,padding='pre',maxlen=sent_length)
# print(embedded_docs)
with open("embedded_docs.pkl", 'wb') as file:
    pickle.dump(embedded_docs, file)
    
with open("l.txt", 'w') as file:
    file.write(str(l))
    

