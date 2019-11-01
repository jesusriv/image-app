const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  all: (_, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err));
  },

  one: (req, res) => {
      User.findById({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err => console.log(err));
  },

  create: (req, res) => {
      const user = new User(req.body);
      user.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
  },

  edit: (req, res) => {
      User.updateOne({_id: req.params.id}, req.body)
        .then(user => res.json(user))
        .catch(err => console.log(err));
  },

  delete: (req, res) => {
      User.deleteOne({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err => console.log(err));
  }
}