const express = require('express');
const {spawn} = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send(`<h1>Toxic Comment API</h1>`);
});

app.get('/predict', (req, res) => {
  const text = req.query.text; // Get the text from the query parameter
  if (!text) {
    return res.status(400).send({error: 'Text parameter is missing'});
  }

  const scriptPath = path.join(__dirname, 'predict.py');
  const pythonExecutable = 'python'; // Replace with the path to your virtual environment's Python executable

  // Run the Python script
  const pythonProcess = spawn(pythonExecutable, [scriptPath, text]);

  let result = '';
  let error = '';

  pythonProcess.stdout.on('data', data => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', data => {
    error += data.toString();
  });

  pythonProcess.on('close', code => {
    if (code !== 0) {
      console.error('Error:', error);
      return res
        .status(500)
        .send({error: 'An error occurred while processing the text'});
    }
    console.log('Prediction:', result.trim());
    res.send({prediction: result.trim()});
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://192.168.10.6:${port}`);
});
