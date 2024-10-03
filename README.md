<h1>Desktop Agent Application</h1>

<h2>Top Contributors</h2>
<a href="https://github.com/Tanu-N-Prabhu/Python/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=harshnishad/VinoveProject"/>
</a>


<h2>Team Members:</h2>
<li><strong>KRISH GUPTA</strong></li>
<li><strong>HARSH NISHAD</strong></li>
<li><strong>YUGDEEP PARIHAR</strong></li>
<li><strong>ARYAN RAJPUT</strong></li>

<h2> Application Report File</h2>
<li><strong>Report File: https://docs.google.com/document/d/15cm1dQlnkONjgso4lhXPmMjbdbIx03XL/edit?usp=sharing&ouid=109225541696855840474&rtpof=true&sd=true</strong></li>

<h2>Application Working Video</h2>
<li><strong>Working Video: https://drive.google.com/file/d/1fF3iS2wmMo0h9PiDb5kE_dpGXMuZ7fnp/view?usp=drive_link </strong></li>



<h2>Technologies Used</h2>


<h3>1. Python</h3>
<ul>
    <li><strong>Core Language:</strong> Python will be the primary language for developing the desktop agent application.</li>
    <li><strong>Libraries:</strong>
        <ul>
            <li><code>pyautogui</code>: For capturing screenshots.</li>
            <li><code>pynput</code>: For monitoring keyboard and mouse activity.</li>
            <li><code>asyncio</code>: For handling asynchronous tasks like periodic screenshot capture and data uploads.</li>
            <li><code>requests</code>: For sending HTTP requests to upload data to cloud services.</li>
            <li><code>pymongo</code>: For interaction with MongoDB if local storage is required before upload.</li>
        </ul>
    </li>
</ul>

<h3>2. Amazon Web Services (AWS)</h3>
<ul>
    <li><strong>Amazon S3:</strong> For storing and managing uploaded screenshots and activity logs.</li>
    <li><strong>AWS Lambda:</strong> For handling the backend processing of uploads, such as file storage or data transformation.</li>
    <li><strong>AWS IAM:</strong> For managing permissions and roles required for secure interaction with S3 and Lambda.</li>
    <li><strong>Boto3:</strong> AWS SDK for Python to interact with S3 for uploading files.</li>
</ul>

<h3>3. FastAPI</h3>
<ul>
    <li>Used for creating an API that handles configuration updates from a web application, allowing the agent to fetch new configurations (e.g., interval times, screenshot settings).</li>
</ul>

<h3>4. MongoDB</h3>
<ul>
    <li>A NoSQL database used for temporarily storing captured data locally (e.g., activity logs and screenshots) before uploading to cloud storage.</li>
</ul>

<h3>5. React.js</h3>
<ul>
    <li>For the front-end of the web application where users can configure the agent settings (e.g., screenshot intervals, whether screenshots should be blurred, etc.).</li>
</ul>

<h3>6. Encryption & Security</h3>
<ul>
    <li><code>PyCryptodome</code>: A library for implementing encryption to ensure that data is securely uploaded to S3.</li>
</ul>

<h3>7. System-level Tools</h3>
<ul>
    <li><strong>Time Zone Management:</strong> Utilizing Python's <code>tzlocal</code> or <code>pytz</code> libraries for detecting and managing time zone changes.</li>
</ul>

<h3>8. Testing and Debugging Tools</h3>
<ul>
    <li><code>Postman</code>: For testing and validating APIs through automated requests, response checks, and collaboration on API development.</li>
</ul>

<h3>9. Error Handling</h3>
<ul>
    <li><strong>Retry Mechanisms:</strong> For retrying failed uploads due to connectivity issues.</li>
    <li><strong>Queueing:</strong> To handle data that couldn’t be uploaded immediately, ensuring it's uploaded once the network is restored.</li>
</ul>


<h1> Application Key Features </h1>
<li><strong>Different dashboards for client and admin</strong></li>
<li><strong>Manage user total active time</strong></li>
<li><strong>Manage user total inactive time</strong></li>
<li><strong>Take screenshot manually and automatically </strong></li>
<li><strong>Store screenshots in AWS S3 bucket </strong></li>
<li><strong>Locally store screenshots in queue if network related problem arise</strong></li>
<li><strong>Track Mouse and Keyboard Movements</strong></li>
<li><strong>Gives warning if user become inactive for more than 30 seconds</strong></li>
<li><strong>Track and store different application usage of client on device and showcase on admin portal  </strong></li>
<li><strong>Track battery status</strong></li>
<li><strong>Show current time according to location </strong></li>
<li><strong>And some more...... </strong></li>



<h1> Important Instructions To Run </h1>

```
Step 1- git clone https://github.com/harshnishad/VinoveProject.git

step 2 ->For Frontend

cd client
npm i
npm start

step 3->For backend

cd server
pip install "all dependencies"
python main.py

```
<b>
<h2> ALWAYS STARTS SERVER FIRST <h2> 
<h3> ID , PASSWORD -> </h3>
<h4> id- client , pass- 1111</h4>
<h4> id- admin  , pass- 0000</h4>
</b>
  
<h1>Dependencies To Install </h1>
<h3>Backent Dependencies</h3>

```
1.motor
2.pyautogui
3.requests
4.pymongo
5.pygetwindow
6.fastapi
7.pydantic
```

<h3>Frontend Dependencies</h3>

```
1.axios
2.react-router-dom
```

## Repository Information

### Commit History

This repository includes a complete commit history that reflects the development process of the project. All changes and updates made during the development phase are documented in the commit history, providing a detailed record of the project's evolution.

To view the commit history:
1. Navigate to the [Commits](https://github.com/harshnishad/VinoveProject/commits) section of this repository on GitHub.
2. Browse through the commits to see the changes made over time.

For a more comprehensive understanding of the development process, you can review the commit messages and associated changes.

