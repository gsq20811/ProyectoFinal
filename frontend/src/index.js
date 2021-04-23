const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
    return res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(process.env.PORT || 4400);