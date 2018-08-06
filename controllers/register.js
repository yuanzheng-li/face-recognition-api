

const handleRegister = (db, bcrypt) => (req, res) => {
  const {email, name, password} = req.body;
  if(!email || !name || !password) {
    return res.status(400).json('invalid form submission');
  }
  
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => res.status(404).json('unable to register'));
  });
}

module.exports = {
  handleRegister: handleRegister
};