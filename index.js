const express = require('express');
const mongoose = require('mongoose');
const { ttlStatusUpdate } = require('./service/TTLService');
const url = 'mongodb://localhost/testDB'

const app = express();
app.use(express.json())
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
  console.log('Connected..')
})

try {

  ttlStatusUpdate();

} catch (error) {
  console.log('error in scheduler', error)
}

require('./routers/index')(app)

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Jump Backend!');
});

app.listen(port, () => {
  console.log(`Jump backend task listening at http://localhost:${port}`);
});