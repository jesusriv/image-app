const mongoose = require('mongoose');
mongoose.model('User');
const user = require('../controllers/users.js')
const image = require('../controllers/images.js')

module.exports = app => {
  app.get('/api/users', user.all);

  app.get('/api/user/:id', user.one);

  app.post('/api/user', user.create);

  app.delete('/api/user/:id', user.delete);

  app.put('/api/user/:id', user.edit);

//   app.get('/', image.home);

//   app.get('/welcome', image.welcome);

//   app.get('/image/getImages', image.getImages);
}