var path = require('path');
var mockroot = path.join(__dirname, 'mock');

module.exports = {
    root: path.join(__dirname, 'dist'),
    outputPath: path.join(__dirname, 'dist', 'assets', 'static')
};