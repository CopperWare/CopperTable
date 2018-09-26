const express = require('express');
const app = express();
const port = 3000;

//ToDo: connect to front end
app.get('/', (req, res) => res.send('Index'));

app.listen(port, () => console.log(`Listening on port ${port}!`));