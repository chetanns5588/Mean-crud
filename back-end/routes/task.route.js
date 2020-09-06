const express = require('express');
const taskRoute = express();
const Task = require('../models/task');

taskRoute.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then(tasks => res.send(tasks))
        .catch((error) => console.log(error));
})

taskRoute.post('/lists/:listId/tasks', (req, res) => {
    (new Task({ 'title': req.body.title, '_listId': req.params.listId }))
        .save()
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
})

taskRoute.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.find({ _listId: req.params.listId, _id: req.params.taskId })
        .then(task => res.send(task))
        .catch((error) => console.log(error));
})

taskRoute.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body })
        .then(task => res.send(task))
        .catch((error) => console.log(error));
})

taskRoute.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
        .then(task => res.send(task))
        .catch((error) => console.log(error));
})

module.exports = taskRoute;