const express = require('express');
const listRoute = express();
const List = require('../models/list');
const Task = require('../models/task');

listRoute.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
})

listRoute.post('/lists', (req, res) => {
    (new List({ 'title': req.body.title }))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
})

listRoute.get('/lists/:listId', (req, res) => {
    List.find({ _id: req.params.listId })
        .then(list => res.send(list))
        .catch((error) => console.log(error));
})

listRoute.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body })
        .then(list => res.send(list))
        .catch((error) => console.log(error));
})

listRoute.delete('/lists/:listId', (req, res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({ _listId: list._id })
            .then(list => res.send(list))
            .catch((error) => console.log(error));
    }
    List.findOneAndDelete({ _id: req.params.listId })
        .then(list => res.send(deleteTasks(list)))
        .catch((error) => console.log(error));

})

module.exports = listRoute;