const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { register } = require('module');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public','html')));
app.use('/',require('./routers/root.js'));
app.use('/register',require('./routers/register.js'));
app.use('/auth',require('./routers/auth.js'));


app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(5000,()=>{
    console.log("server is listenting . . . ")
})