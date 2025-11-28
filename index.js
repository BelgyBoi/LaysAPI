const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// routes: auth, user profile, flavour, voting, flavour submission, admin (flavour managament && submissions + votes)

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});