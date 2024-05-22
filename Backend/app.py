# Flask application with logging setup
from flask import Flask, request, jsonify
import logging
from logstash_async.handler import AsynchronousLogstashHandler
from logstash_async.formatter import LogstashFormatter
import subprocess
import json
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Setup logger
logger = logging.getLogger('app_logger')
logger.setLevel(logging.DEBUG)  # Use DEBUG level for more verbose output

# Setup Logstash handler
logstash_handler = AsynchronousLogstashHandler(
    host='logstash',  # Use the service name defined in docker-compose
    port=6000,
    database_path=None
)
logstash_formatter = LogstashFormatter()
logstash_handler.setFormatter(logstash_formatter)
logger.addHandler(logstash_handler)

@app.route('/listofmovies', methods=['GET'])
def list_of_movies():
    try:
        df_movies = pd.read_csv("df_movies.csv")
        movies_list = df_movies.to_dict(orient='records')
        logger.info('Movies list retrieved successfully', extra={'movies': movies_list})
        return jsonify(movies_list)
    except Exception as e:
        logger.error(f"Error retrieving movies list: {str(e)}")
        return f"An error occurred: {str(e)}", 500

@app.route('/moviename', methods=['POST'])
def process():
    try:
        data = request.get_json()
        data_str = json.dumps(data)
        result = subprocess.run(['python3', 'model.py', data_str], capture_output=True, text=True)

        if result.returncode == 0:
            output = result.stdout.strip()
            logger.info('Model executed successfully', extra={'output': output})
            return output
        else:
            error_output = f"Error executing model.py: {result.stderr.strip()}"
            logger.error(error_output)
            return error_output, 500
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return f"An error occurred: {str(e)}", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



