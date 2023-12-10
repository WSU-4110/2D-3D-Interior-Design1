const express = require('express');
const { exec } = require('child_process');
//const phpMiddleware = require('express-php');

const app = express();
const port = 3000;


app.use(express.static('public'));

//app.use(php.cgi('./php'));

// Define routes for different pages

// Home Page
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/homepage.html');
});

app.get('/', function(req, res){exec("/Login.php", function (error, stdout, stderr) {res.send(stdout);});});

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/Login.php');
});
*/

// About Page
app.get('/about', (req, res) => {
  res.sendFile(__dirname+'/aboutUs.html');
});

// Contact Page
app.get('/contact', (req, res) => {
  res.sendFile(__dirname+'/Contacts.html');
});

// App Page
app.get('/grid', (req, res) => {
    res.sendFile(__dirname+'/updatedgrid.html');
  });

  /*
// Run Command Route
app.get('/runcmd', (req, res) => {
  const command = 'your-shell-command';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the command: ${error.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (stderr) {
      console.error(`Command produced an error: ${stderr}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(`Command output: ${stdout}`);
    res.status(200).send('Command executed successfully');
  });
});
*/
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
