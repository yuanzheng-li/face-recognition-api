require('../load-env');

const Clarifai = require('Clarifai');

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
  clarifaiApp
    .models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
};

const handleImage = (db) => (req, res) => {
  const {id, entries} = req.body;
  db('users').where('id', '=', id)
    .increment('entries', entries)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = { handleImage, handleApiCall };