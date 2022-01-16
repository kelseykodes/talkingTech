const { User } = require("../models");

const userData =
[
  {
    "name": "Test",
    "email": "test@test.com",
    "password": "codingiscool"
  },
  {
    "name": "Kelsey",
    "email": "kelseykodes@yahoo.com",
    "password": "codingisgreat"
  },
  {
    "name": "Anne",
    "email": "anne@test.com",
    "password": "codingisawesome"
  },
]

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;