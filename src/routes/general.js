const express = require('express');

const router = express.Router();

const { getTwitCount, addNewTopic } = require('../controllers/general');

router.get('/count', async (req, res, next) => {
  try {
    const twitsCount = await getTwitCount();
    res.status(200).json(twitsCount);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.post('/topic', async (req, res, next) => {
  try {
    if (req.body && req.body.topic) {
      await addNewTopic(req.body.topic);
      res.status(200).json({ message: 'Topic created' });
    } else {
      throw {
        status: 400,
        message: 'Plase provide a topic to add',
      };
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = router;
