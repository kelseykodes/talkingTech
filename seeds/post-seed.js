const { Post } = require("../models");

const postData = 
[
  {
    user_id: 1,
    name: "Node.js",
    post: "L'istruzione tecnica e professionale deve essere messa alla portata di tutti e l'istruzione superiore deve essere egualmente accessibile a tutti sulla base del merito.",
  },
  {
    user_id: 2,
    name: "Test Driven Development",
    post: "L'istruzione deve essere indirizzata al pieno sviluppo della personalità umana ed al rafforzamento del rispetto dei diritti umani e delle libertà fondamentali."
  },
  {
    user_id: 3,
    name: "Models",
    post: "Ogni individuo ha diritto all'istruzione. L'istruzione deve essere gratuita almeno per quanto riguarda le classi elementari e fondamentali. L'istruzione elementare deve essere obbligatoria.",
  },
  {
    user_id: 4,
    name: "MySQL",
    post: " Essa deve promuovere la comprensione, la tolleranza, l'amicizia fra tutte le Nazioni, i gruppi razziali e religiosi, e deve favorire l'opera delle Nazioni Unite per il mantenimento della pace"
  },
]

const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;