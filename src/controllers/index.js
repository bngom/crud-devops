
const Item = require("../db/model.js").Item;

exports.createItem = (req, res) => {
  // check name
  if (!req.body.name) {
    res.status(400)
    .send({ message: "item name is mandatory!" });
    return;
  }
  if (!req.body.quantity) {
    res.status(400)
    .send({ message: "quantity is mandatory!" });
    return;
  }
  // Create an Item
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description,
    checked: req.body.checked ? req.body.checked : false
  });
  // Store Item in the db
  item
    .save(item).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error in item creation"
      });
    });
};

exports.getAllItem = (req, res) => {
  
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Item.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Cannot retrieve Items!"
      });
    });
};

exports.getOneItem = (req, res) => {
  // get the id to find from paramters
  const id = req.params.id;
  
  Item.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Item with id: " + id });
    });
};

exports.updateItem = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Update failed! Item with id=${id}  not found!`
        });
      } else res.send({ message: "Item updated!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Update failed! id=" + id
      });
    });
};

exports.deleteOneItem = (req, res) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Item with id=${id} was not found!`
        });
      } else {
        res.send({
          message: "Item deleted!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item id=" + id
      });
    });
};

exports.deleteAllItems = (req, res) => {
  Item.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Items deleted!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message 
      });
    });
};

exports.getAllCheckedItem = (req, res) => {
  Item.find({ checked: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while "
      });
    });
};


