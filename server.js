import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'public', 'mockPlayers.json');
const filePathDetails = path.join(__dirname, 'public', 'mockPlayersDetails.json');

// Endpoint to get players
app.get('/players', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json(JSON.parse(data));
    });
});
// Endpoint to add a new player
app.post('/players', (req, res) => {
    const newPlayer = req.body;
    let newPlayerDetails = req.body;
    newPlayerDetails={
        ...newPlayer,
        "totalGames": 4,
        "totalWins": 1,
        "totalLosses": 3,
        "winRate": 25,
        "totalScore": 100,
        "averageScore": 25,
        "highestScore": 50,
        "lowestScore": 2,
        "lastGame": {
            "score": 50,
            "date": "2024-01-01"
        }
    }
    const savePlayers = new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            const players = JSON.parse(data);
            players.push(newPlayer);

            fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
                if (err) return reject(err);
                resolve(players);
            });
        });
    });

    const savePlayersDetails = new Promise((resolve, reject) => {
        fs.readFile(filePathDetails, 'utf8', (err, data) => {
            if (err) return reject(err);
            const playersDetails = JSON.parse(data);
            playersDetails.push(newPlayerDetails);

            fs.writeFile(filePathDetails, JSON.stringify(playersDetails, null, 2), (err) => {
                if (err) return reject(err);
                resolve(playersDetails);
            });
        });
    });

    Promise.all([savePlayers, savePlayersDetails])
        .then(([updatedPlayers, updatedPlayersDetails]) => {
            res.json(updatedPlayers);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error writing files' });
        });
});
app.patch('/players/:id', (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    if (updatedFields.hasOwnProperty('score')) {
        updatedFields.score = parseInt(updatedFields.score, 10);
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }

        let players = JSON.parse(data);
        const index = players.findIndex((player) => player.id === Number(id));

        if (index === -1) {
            return res.status(404).json({ error: 'Player not found' });
        }

        players[index] = {
            ...players[index],
            ...updatedFields
        };

        fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Error writing file' });
            }
            res.json(players);
        });
    });
});
app.get('/players/details/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile(filePathDetails, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }
        let players = JSON.parse(data);
        const index = players.findIndex((player) => player.id === Number(id));
        if (index === -1) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json(players[index]);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
