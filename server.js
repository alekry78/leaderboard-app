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

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }

        const players = JSON.parse(data);
        players.push(newPlayer);

        fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Error writing file' });
            }
            res.json(players);
        });
    });
});
app.patch('/players/:id', (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
