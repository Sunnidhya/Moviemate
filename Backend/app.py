from flask import Flask,jsonify
from flask_mysqldb import MySQL

app= Flask(__name__)


# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Samarpita1@'
app.config['MYSQL_DB'] = 'Moviemate'

mysql = MySQL(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/data', methods=['GET'])
def get_data():
    # Create a cursor
    cursor = mysql.connection.cursor()

    # Execute SQL statements
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          username VARCHAR(255),
                          email VARCHAR(255)
                      )''')

    cursor.execute('''INSERT INTO users (username, email) VALUES (%s, %s)''', ('john_doe', 'john@example.com'))

    # cursor.execute('''DELETE FROM users WHERE username = %s''', ('john_doe',))

    # Commit changes
    mysql.connection.commit()

    # Close cursor
    cursor.close()

    return 'SQL statements executed successfully!'
 
if __name__ == '__main__':  
   app.run(debug=True, port=3000)