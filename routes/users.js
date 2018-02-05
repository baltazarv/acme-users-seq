const router = require('express').Router();
var db = require('../db');
const Users = db.models.Users;

router.route('/')
  .get((req, res, next) => {
    Users.findAll()
      .then( users => res.render('users', { users }))
      .catch( err => next(err));
  })
  .post((req, res, next) => {
    // NO ERROR CHECKING FOR BLANK USERNAME ENTRY
    // console.log('req body', req.body);
    // if (req.body.name) {
      Users.create(req.body)
      .then(() => res.redirect('/users'))
      .catch(err => next(err));
    // } else {
    //   res.redirect('/users', { error: 'username_required' });
    // }
  });

router.delete('/:id', (req, res, next) => {
  Users.findById(req.params.id)
  .then(user => user.destroy())
  .then(() => res.redirect('/users'))
  .catch(err => next(err));
});

module.exports = router; // WHY EXPORT?
