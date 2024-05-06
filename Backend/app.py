from flask import Flask, request
import subprocess
import json
import pandas as pd
from flask import jsonify  # Import jsonify
from flask_cors import CORS,cross_origin

app = Flask(__name__) 
CORS(app)

@app.route('/listofmovies',methods=['GET'])
def list_of_movies():
    try:
        df_movies = pd.read_csv('./df_movies.csv')
        
        # Convert DataFrame to a list of dictionaries
        movies_list = df_movies.to_dict(orient='records')
        
        # # Modify each dictionary to include 'id' and 'name' keys
        # for movie in movies_list:
        #     movie['Title'] = movie.pop('Title')  # Assuming 'Title' is the column name for movie names
        
        return jsonify(movies_list)
    except Exception as e:
        return f"An error occurred: {str(e)}", 500


@app.route('/moviename', methods=['POST'])
def process():
    try:
        data = request.get_json()
        data_str = json.dumps(data)
        
        # Run the model.py script
        result = subprocess.run(['python', 'model.py', data_str], capture_output=True, text=True)
        
        print(data_str)
        # Check if the subprocess was successful
        if result.returncode == 0:
            output = result.stdout.strip()
            return output
        else:
            error_output = f"Error executing model.py: {result.stderr.strip()}"
            return error_output, 500 
    except Exception as e:
        return f"An error occurred: {str(e)}", 500

if __name__ == '__main__':
    app.run(host = '192.168.8.169', port = 3000, debug=True)
