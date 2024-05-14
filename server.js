const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/paris2024sapioce')));

// Send all requests to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/paris2024sapioce', 'home.html'));
});

app.listen(process.env.PORT || 8080);