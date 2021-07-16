let data = require('../data/flower');
const { v4: uuidv4 } = require('uuid');
let flowers = data.data

const list = (callback) => {
    return callback(null, flowers);
}

const findById = (id, callback) => {
    return callback(null, flowers.find(x => x.id === id));
}

const create = (model, callback) => {
    let { name, amount } = model;
    if (!name || !amount || amount <= 0) {
        callback({ message: "Flower is invalid!" });
        return;
    }

    model = {
        id: uuidv4(),
        name,
        amount
    };
    flowers.push(model);
    callback(null, model);
}

const deleteItem = (id, callback) => {
    let length = flowers.length;
    flowers = flowers.filter(item => item.id != id);
    length = length - flowers.length;
    callback(null, { length });
}

const update = (id, model, callback) => {
    let old = flowers.find(item => item.id == id);
    if (!old) {
        callback("Flower not found!");
        return;
    }
    let index = flowers.indexOf(old);
    Object.assign(old, model);
    flowers.fill(old, index, ++index);
    callback(null, old);
}

module.exports = {
    list,
    create,
    findById,
    delete: deleteItem,
    update
}