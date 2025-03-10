# rguhack2025
download the respository by running this command in your terminal: `git clone https://github.com/clararingrose/rguhack2025-final.git` or download the zip<br>
open the folder: `cd rguhack2025-final`<br>

<h1>save your OpenAI API key as an environment variable:</h1> <br>
<strong>Using command:</strong> `export OPENAI_API_KEY=[insert openai key here]`<br>
OR<br>
<strong>Manually for windows machine</strong>
<ul>
  <li><strong>Open System Properties:</strong>
    <ul>
      <li>Press <strong>Win + X</strong> and select <strong>System</strong>, or right-click on the Start button and choose <strong>System</strong>.</li>
      <li>Alternatively, press <strong>Win + Pause/Break</strong> on your keyboard to open the System settings directly.</li>
    </ul>
  </li>
  <li><strong>Open Advanced System Settings:</strong>
    <ul>
      <li>On the left side, click on <strong>Advanced system settings</strong>.</li>
    </ul>
  </li>
  <li><strong>Open Environment Variables:</strong>
    <ul>
      <li>In the <strong>System Properties</strong> window, click on the <strong>Environment Variables</strong> button.</li>
    </ul>
  </li>
  <li><strong>Add New Variable:</strong>
    <ul>
      <li>In the <strong>Environment Variables</strong> window, click <strong>New</strong> under either the <strong>User variables</strong> section (for your user only) or the <strong>System variables</strong> section (for all users).</li>
    </ul>
  </li>
  <li><strong>Enter Variable Name and Value:</strong>
    <ul>
      <li><strong>Variable Name:</strong> Enter the name of the environment variable (OPENAI_API_KEY).</li>
      <li><strong>Variable Value:</strong> Enter the value for the variable (insert openai key here).</li>
    </ul>
  </li>
</ul>

<h1>Install Node:</h1>
<strong>To install node run following commands in terminal:</strong>
<ul>
  <li>winget install Schniz.fnm</li>
  <li>fnm install 22</li>
</ul>
Or visit: <a href="https://nodejs.org/en/download">https://nodejs.org/en/download</a> 
And select the windows installer.<br><br>

<h1>Setup and run webapp</h1>
<strong>Inside the project directory ("rguhack2025-final") run the following commands:</strong><br>
install express: `npm install express`<br>
run the server: `node index.js`<br>
Then visit 'http://localhost:8080/' in your web browser
