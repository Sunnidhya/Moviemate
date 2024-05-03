import sys
import json
import pandas as pd
import numpy as np


def pearson_correlation(user_ratings, other_user_ratings):
    # Mean of user ratings
    mean_user = np.mean(user_ratings)
    mean_other_user = np.mean(other_user_ratings)
    
    # Compute covariance
    cov = np.sum((user_ratings - mean_user) * (other_user_ratings - mean_other_user))
    
    # Compute standard deviations
    std_user = np.sqrt(np.sum((user_ratings - mean_user) ** 2))
    std_other_user = np.sqrt(np.sum((other_user_ratings - mean_other_user) ** 2))
    
    # Compute Pearson correlation coefficient
    pearson_corr = cov / (std_user * std_other_user)
    
    return pearson_corr
def cosine_similarity(user_ratings, other_user_ratings):
    # Compute dot product between the two vectors
    dot_product = np.dot(user_ratings, other_user_ratings)
    
    # Compute magnitudes of each vector
    magnitude_user = np.sqrt(np.sum(user_ratings ** 2))
    magnitude_other_user = np.sqrt(np.sum(other_user_ratings ** 2))
    
    # Compute cosine similarity
    cosine_sim = dot_product / (magnitude_user * magnitude_other_user)
    
    return cosine_sim
# Function to convert a DataFrame row to a JSON object
def row_to_json(row):
    return {
        'Title': row[1]['Title'],
        'Genre': row[1]['Genres'],
        
    }

# Function to send top k recommended movies of a genre as JSON
def send_top_k_movies(top_recommended_movies_genre, k):
    # Initialize an empty list to store JSON objects
    json_objects = []

    # Iterate over the first k rows of top_recommended_movies_genre
    for row in top_recommended_movies_genre.head(k).iterrows():
        # Convert the row to a JSON object
        json_obj = row_to_json(row)
        # Append the JSON object to the list
        json_objects.append(json_obj)

    # Serialize the list of JSON objects to JSON format
    json_data = json.dumps(json_objects)

    # Return the JSON data
    return json_data


def main():
    
    
    df_new= pd.read_csv("./merged_data.csv")
    df_movies= pd.read_csv("./df_movies.csv")
    
    
    
    user_movie_matrix = df_new.pivot_table(index='UserID',columns='Title',values='Rating').fillna(0)
    
    
    new_row_index = len(user_movie_matrix)  # Index for the new row
    new_row_values = [0] * len(user_movie_matrix.columns)  # Values for the new row
    
    # Appending the new row to the DataFrame
    user_movie_matrix.loc[new_row_index+1] = new_row_values
    
    index_number = 6041
    
    
    # Read the serialized JSON data from command line arguments
    data_str = sys.argv[1]

    # Deserialize the JSON data
    data = json.loads(data_str)

    

    # Iterate through the array of objects and construct movie information
    for item in data:
        movie_title = item.get('movie_title')
        rating = float(item.get('rating'))
        user_input_value = movie_title
        user_rating = rating
        user_movie_matrix.at[index_number, user_input_value] = user_rating
    
    user_movie_matrix_norm = user_movie_matrix.subtract(user_movie_matrix.mean(axis=1), axis = 'rows')
    
    
    # Choose a particular user
    user_id = 6041

    # Select the row corresponding to the chosen user
    user_ratings = user_movie_matrix_norm.iloc[user_id-1]

    # Compute Pearson correlation with other users

    user_similarity = {}
    for other_user_id, other_user_ratings in user_movie_matrix_norm.iterrows():
        if other_user_id != user_id:
            similarity = pearson_correlation(user_ratings, other_user_ratings)
            user_similarity[other_user_id] = similarity
        
        

    # Remove the user's own similarity score from the dictionary
    user_similarity.pop(user_id, None)

    # Convert the dictionary to a pandas Series
    user_similarity = pd.Series(user_similarity)
    # Take a look at the data
    user_similarity.head()
    
    # Number of similar users
    n = 10
    # Get top n similar users
    similar_users = user_similarity.sort_values(ascending=False)[:n]
    
    similar_user_movies = user_movie_matrix_norm[user_movie_matrix_norm.index.isin(similar_users.index)].dropna(axis=1, how='all')
   
    # A dictionary to store movie scores
    item_score = {}

    # Loop through the similar movies
    for i in similar_user_movies.columns:
    
        # Retrieve the ratings for movie i
        movie_rating = similar_user_movies[i]
    
        # Create a variable to store the movie score
        total = 0
    
        # Create a variable to store the number of scores
        count = 0
    
        # Loop through similar users
        for u in similar_users.index:
        
            # Score is the sum of user similarity score multiply by the movie rating
            score = similar_users[u] * movie_rating[u]
    
            # Add the score to the total score for the movie so far
            total += score
            count +=1
    
        # Get the average score for the item
        item_score[i] = total / count # Formula: Summation(user_similarity_value * rating given by the user)/total number of similar users.
    
    # Convert dictionary to pandas dataframe
    item_score = pd.DataFrame(item_score.items(), columns=['movie', 'movie_score'])
    
    # Sort the movies by score
    top_recommended_movies = item_score.sort_values(by='movie_score', ascending=False)

    top_recommended_movies.rename(columns={'movie': 'Title'}, inplace=True)

    temp_df = top_recommended_movies[['Title']].copy()

    top_recommended_movies_genre = pd.merge(temp_df, df_movies, on='Title')


    top_recommended_movies_genre.drop(columns=['MovieID'], inplace=True)


    # Select top k movies
    k = 20
    # top_recommended_movies_genre.head(k) 

    json_data = send_top_k_movies(top_recommended_movies_genre, k)

    # Now you can return json_data or use it as needed
    print(json_data)



if __name__ == "__main__":
    main()


