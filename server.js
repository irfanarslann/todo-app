const express = require('express');
const app = express();
const db = require('./config/db');

//Mongodb Connection
db();
//Init Middleware
app.use(express.json({ extended: false }));

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todo', require('./routes/todo'));
app.use('/api/user', require('./routes/user'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server Connected'));
