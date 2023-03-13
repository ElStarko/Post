const express = require('express');
const initDb  = require('./config/db')


const app = express()
const port = process.env.PORT || 5000;

initDb();
app.use(express.json({ extended: false}))
app.get('/',(req,res) => res.json({msg: `welcome to this api`}))

// app.use('/api/postits', require('./routes/postit'))
// app.use('/api/comments', require('./routes/postit'))

app.use('/api/users',require('./routes/users'))

app.listen(port, () => console.log(`server is running on ${port}`))