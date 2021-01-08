/**
 * CRUD functions for tasks
 */

const taskModel = require('../models/task.model');
const listModel = require('../models/list.model');


// Create and save a task
exports.createTask = async function(req, res, next) {
    try {
        const data = {
            name: req.body.name,
            status: req.body.status,
            list_id: req.body.list_id
        };

        const doc = await taskModel.create(data);


        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        });

        res.redirect("/");

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);

        res.redirect("/");
    }
};


// Update a task
exports.updateTask = async function(req, res, next) {
    try {
        const id = req.params.id;
        const data = {
            name: req.body.name,
            status: req.body.status,
            list_id: req.body.list_id
        };

        const doc = await taskModel.findByIdAndUpdate(id, data, {
            new: true, // updated data is returned to function
            runValidators: true
        });


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Delete a task
exports.deleteTask = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await taskModel.findByIdAndDelete(id);


        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get a task
exports.getTask = async function(req, res, next) {
    try {
        const id = req.params.id;

        const doc = await taskModel.findById(id);


        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
            data: {
                doc
            }
        })

        next(err);
    }
};


// Get all tasks
exports.getAllTasks = async function(req, res) {
    try {
        const list_id = req.params.list_id;
        let listName = "";

        const listData = await listModel.find({ list_id: list_id }, function(err, data) {
            if (data.length > 0) {
                listName = data[0].name;
            }  
        });

        const doc = await taskModel.find({ list_id: list_id }, function(err, data) {
            res.render('task-view', { "tasks": data, "listName": listName });
        });

    } catch (err) {
        console.log("Error getting all tasks for list " + ": " + err);
    }
};
