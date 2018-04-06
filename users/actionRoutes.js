const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel.js');

// READ actions
router.get('/', (req, res) => {
  db
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// READ action by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// CREATE action
router.post('/', (req, res) => {
  const action = req.body;
  db
    .insert(action)
    .then(actions => {
      console.log('ok');
      res.status(201).json(actions);
    })
    .catch(error => {
      console.log('error');
      res.status(500).json(error);
    });
});

// UPDATE action
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db
    .update(id, changes)
    .then(count => {
      if (count > 0) {
        db.get(id).then(changes => {
          res.status(200).json(changes);
        });
      } else {
        res.status(404).json({ message: 'The action could not be updated' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE action
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  db
    .remove(id)
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
