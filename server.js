
const express = require('express');
const app = express();
// var tjs = require("templatesjs")
// tjs.set()
app.listen(1337, () => console.log("Listening on 1337"));
app.use(express.static('public'));