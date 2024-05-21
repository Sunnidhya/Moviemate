import unittest
import requests
import json
from app import app

class TestBackend(unittest.TestCase):

    def test_list_of_movies(self):
        response = requests.get('/listofmovies')
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        print("Response from /listofmovies endpoint:", data)
        self.assertIsInstance(data, list)
        self.assertTrue(len(data) > 0)
        

    def test_process(self):
        
        payload = json.dumps(
            [{
            "movie": "Titan A.E. (2000)",
            "rating":"5"
            }]
        )
        headers = {'Content-Type': 'application/json'}
        response = requests.post('/moviename', data=payload, headers=headers)
        self.assertEqual(response.status_code, 200)
        print("Response from /moviename endpoint:", response.text)
        

if __name__ == '__main__':
    unittest.main()
