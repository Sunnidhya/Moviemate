M o v i e m a t e 

A mobile application to get recommendation based on your favorite movies

Steps:
1. Clone the Repository
2. Open the front-end folder in VS-Code, go inside the project directory using cd project/path
   and execute npm install/npm install --force.
4. Install Expo Go mobile app and connect to the application running on your system.
5. Open the back-end folder in VS-Code, go inside the project directory using cd project/path
   and execute pip install -r requirements.txt, once everything is installed execute python3 app.py
7. Now that both the front end and back-end are running you will be able to use our Moviemate application.

The entire process can be done in an automated manner using Docker, Docker-compose, Ansible, ELK
1. Install Jenkins and the required dependencies.
2. Create a new Pipeline Project and enter the git link in the Github Project Part.
3. Click on Build Now in the left tab of the created Project.
4. Once the Ansible Deployment stage is reached open your Expo Go mobile App, you should be able to see the
   Development server build ready.
5. Try to access http://127.0.0.1:5601/ to acess the ELK dashboard, wait for some time(~3-4mins).
   a. In the left tab scroll down and click on Stack Management.
   b. Again scroll down and Click on Index Pattern under Kibana in the left tab
   c. Create an Index-pattern as "logstash-logs*" and select @timestamp.
   d. Finally click on Discover under Analytics in the left tab to view the Logs streaming in.
 
 
