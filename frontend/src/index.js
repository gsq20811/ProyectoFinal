const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(`${process.cwd()}/dist`));

app.get('*', (req, res) => {
    return res.sendFile(path.join(`${process.cwd()}/dist/index.html`));
});

app.listen(process.env.PORT || 4400);