const flower = require('../models/flower');

let getAll = (req, res) => {
    flower.list((err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(data);
    });
};

let create = (req, res) => {
    let model = req.body;
    flower.create(model, (err, data) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Flower successfully added!",
            data: data
        });
    });
};

let getById = (req, res) => {
    flower.findById(req.params.id, (err, data) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            data
        });
    })
};

let deleteItem = (req, res) => {
    flower.delete(req.params.id, (err, data) => {
        res.json({
            message: "Flower successfully deleted!",
            data
        });
    })
};

let update = (req, res) => {
    flower.update(req.params.id, req.body, (err, data) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Flower updated!",
            data
        });
    })
};

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteItem
};