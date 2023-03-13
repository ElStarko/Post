const express = require('express');
const initDb = require('./config/db')


const app = express()
const port = process.env.PORT || 5000;

initDb();
app.use(express.json({ extended: false }))
app.get('/', (req, res) => res.json({ msg: `welcome to this api` }))
app.get('/api/v1/docs', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/26234378/2s93JutNT2');
});

app.use('/api/postits', require('./routes/postits'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/users', require('./routes/users'))

app.listen(port, () => console.log(`server is running on ${port}`))
