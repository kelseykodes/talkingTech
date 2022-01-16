const express = require('express');
const exphbs = require('express-handlebars')
const session = require('express-session')
const path = require('path');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers/');
const hbs = exphbs.create({ helpers });

// Init sessions
const sess = {
    secret: "can you keep a secret",
    cookie: {
         maxAge: 3300000 
        },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Init server
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });


//   sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });