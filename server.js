const express = require('express');
const cors = require('cors'); 
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors()); 

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/calculate-radius', (req, res) => {
    const { type, value, angle } = req.query;
    console.log(`Received request: type=${type}, value=${value}, angle=${angle}`);

    if (!type || !value) {
        return res.status(400).send('Missing required parameters');
    }

    let command = `java CircleRadiusCalculator ${type} ${value}`;
    if (angle) {
        command += ` ${angle}`;
    }

    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            return res.status(500).send('Error executing Java program');
        }
        console.log(`Java Output: ${stdout.trim()}`);
        res.send(`${stdout.trim()}`);
    });
});

app.get('/plycircles', (req, res) => {
    const { type, value, food } = req.query;
    console.log(`Received request: type=${type}, value=${value}, food=${food}`);

    if (!type || !value) {
        return res.status(400).send('Missing required parameters');
    }

    let command = `java PlyCircles ${type} ${value}`;
    if (food) {
        command += ` ${food}`;
    }

    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            return res.status(500).send('Error executing Java program');
        }
        console.log(`Java Output: ${stdout.trim()}`);
        res.send(` ${stdout.trim()}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


