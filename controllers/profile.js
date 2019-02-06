const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
  db.select()
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json('no such user');
      }
    })
    .catch((err) => res.status(400).json('error getting user'));
};

const handleProfileUpdate = (db) => (req, res) => {
  const { id } = req.params;
  const { name, age, pet } = req.params.formInput;
  db.select()
    .from('users')
    .where({ id })
    .update({ name })
    .then((user) => {
      if (user) {
        res.json('Update Success');
      } else {
        res.status(400).json('Unable to update');
      }
    })
    .catch((err) => res.status(400).json('error updating user'));
};

module.exports = { handleProfileGet, handleProfileUpdate };
