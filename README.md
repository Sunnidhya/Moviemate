<h2>CineCompanion</h2>
<h4>A mobile application to get recommendation based on your favorite movies </h4>

<h5>Steps:</h5>
<h6>
  <ol>
  <li>Clone the Repository</li> 
   <li>Open the front-end folder in VS-Code, go inside the project directory using cd project/path
   and execute npm install/npm install --force.</li>
   <li>Install Expo Go mobile app and connect to the application running on your system.</li>
   <li>Open the back-end folder in VS-Code, go inside the project directory using cd project/path
   and execute pip install -r requirements.txt, once everything is installed execute python3 app.py.</li>
   <li>Now that both the front end and back-end are running you will be able to use our Moviemate application.</li>
  
</ol>
</h6>



<h5> The entire process can be done in an automated manner using Jenkins, Docker, Docker-compose, Ansible, ELK </h5>
<h6>
  <ol>
  <li>Install Jenkins and the required dependencies.</li>
  <li>Create a new Pipeline Project and enter the git link in the Github Project Part.</li>
  <li>Click on Build Now in the left tab of the created Project.</li>
  <li>Once the Ansible Deployment stage is reached open your Expo Go mobile App, you should be able to see the
   Development server build ready.</li>
  <li>Try to access http://127.0.0.1:5601/ to acess the ELK dashboard, wait for some time(~3-4mins).
    <ul>
      <li>In the left tab scroll down and click on Stack Management.</li>
      <li>Again scroll down and Click on Index Pattern under Kibana in the left tab.</li>
      <li>Create an Index-pattern as "logstash-logs*" and select @timestamp.</li>
      <li>Finally click on Discover under Analytics in the left tab to view the Logs streaming in.</li>
    </ul>
  </li>
</ol>
</h6>
<hr>
<h6>To know more, refer our project report "Moviemate_Project_Report.pdf"</h6>

 
 
