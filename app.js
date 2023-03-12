const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({
  path: `${__dirname}/dev.env`,
});

const db = require('./models/index.js');
const routes = require('./routes');
const corsOptions = {
  origin: 'http://localhost:4200',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

db.sequelize.sync()
    .then(() => {
      console.log('Synced db.');
    })
    .catch((err) => {
      console.log('Failed to sync db: ' + err.message);
    });

app.listen(process.env.PORT || 8080, () => {
  console.log('Server run on 8080');
});
routes.init(app);
