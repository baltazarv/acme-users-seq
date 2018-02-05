const Sequelize = require('sequelize');
if (!process.env.DATABASE_URL){
  throw new Error('DATABASE_URL not set');
}
const _conn = new Sequelize(process.env.DATABASE_URL);

const Users = _conn.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const data = [
  { name: 'Melchior' },
  { name: 'Gaspiar' },
  { name: 'Baltazar' }
];

const sync = () => {
  return _conn.sync({ force: true });
};

// also can use Promis.all() since don't need in series
const seed = () => {
  return data.reduce((users, user) => {
    return users.then(() => Users.create(user)).then(user => console.log(user.get()));
  }, Promise.resolve())
    .then(() => {
      return Users.findAll();
    }); // WHY RETURN ALL USERS?!
};

module.exports = {
  sync,
  seed,
  models: {
    Users
  }
};
