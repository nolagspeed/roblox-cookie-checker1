const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static('.')); // يخلي index.html و style.css يشتغلوا مباشرة

app.post('/check-cookie', async (req, res) => {
    const cookie = req.body.cookie?.trim();
    if (!cookie) return res.status(400).json({ error: "No cookie provided" });

    try {
        const response = await fetch("https://users.roblox.com/v1/users/authenticated", {
            method: "GET",
            headers: { "Cookie": `.ROBLOSECURITY=${cookie}` }
        });

        if (response.status === 200) {
            const data = await response.json();
            res.json({ valid: true, username: data.name, userId: data.id });
        } else {
            res.json({ valid: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
