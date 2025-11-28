const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const defaultRoutes = require('./routes/v1/default');
const adminRoutes = require('./routes/v1/admin')

// routes: auth, user profile, flavour, voting, flavour submission, admin (flavour managament && submissions + votes)

app.use('/api/v1/consumer', consumerRoutes);
app.use('/api/v1/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});