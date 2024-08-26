<h1>Desktop Agent Application</h1>

<h2>Top Contributors</h2>
<a href="https://github.com/Tanu-N-Prabhu/Python/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=harshnishad/VinoveProject"/>
</a>

<h2> Application Report File</h2>
<li><strong>Report File:</strong></li>

<h2>Application Working Vedio</h2>
<li><strong>Working Vedio: https://drive.google.com/file/d/1ntOJAYK0_ffjGvIAPBc25CTMfzXwVM7d/view?usp=sharing </strong></li>

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
            <li><code>PIL</code> (Pillow): For image processing tasks like blurring screenshots.</li>
            <li><code>watchdog</code>: For monitoring file system changes or configuration updates.</li>
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
    <li><code>Pytest</code>: For unit testing the different components of the application.</li>
    <li><strong>Logging:</strong> Using Python's <code>logging</code> module for error handling, activity tracking, and debugging.</li>
</ul>

<h3>9. Deployment & Packaging</h3>
<ul>
    <li><code>PyInstaller</code>: To package the Python script as a standalone executable that can run on users' desktops without requiring them to install Python.</li>
</ul>

<h3>10. Error Handling</h3>
<ul>
    <li><strong>Retry Mechanisms:</strong> For retrying failed uploads due to connectivity issues.</li>
    <li><strong>Queueing:</strong> To handle data that couldn’t be uploaded immediately, ensuring it's uploaded once the network is restored.</li>
</ul>


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





