const { Comment } = require('../models');

const commentData = [
  {
    comment: "Does anyone else think TDD is hard?",
    post_id: 3,
    user_id: 4
  },
  {
    comment: "TDD can be difficult at first but, once you pass all your suites, it's pretty sweet!",
    post_id: 1,
    user_id: 2
  },
  {
    comment: "What's the difference between foreign key and primary key?",
    post_id: 4,
    user_id: 1
  },
  {
    comment: "One key is foreign, the other is primary.",
    post_id: 5,
    user_id: 3
  },
  {
    comment: "Guys go follow me on Github!",
    post_id: 2,
    user_id: 5
  },
];

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;