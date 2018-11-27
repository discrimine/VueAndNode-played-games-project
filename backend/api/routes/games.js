const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Game = require('../models/game');

router.get('/', (req, res, next) => {
    Game.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
    });
    body_content = req.body
    body_length = body_content.length;
    if (body_length > 2) {
        for (let i = 0; i < body_length; i++) {
            game[body_content[i].propName] = body_content[i].value;
        }
        game
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Games for post',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(204).json({
                error: err
            });
        });
    } else {
        res.status(500).json({error: err})
    }  
});

router.get('/:gameId', (req, res, next) => {
    const id = req.params.gameId;
    Game.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'undefined id'});
            }
            
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.patch("/:gameId", (req, res, next) => {
    const id = req.params.gameId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Game.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});

router.delete("/:gameId", (req, res, next) => {
    const id = req.params.gameId;
    Game.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;