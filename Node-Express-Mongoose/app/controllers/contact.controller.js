const mongoose = require('mongoose')
const db = require('../models/index');
const Contact = db.contact;

const err400Message = "Content can't be empty!";
const err500Message = "Some error occured while creating the contact.";

// Create and save new contact.
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: err400Message });   
        return
    }

    // Create a contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    contact.save(contact).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || err500Message
        })
    });
};

// Retrieve all contact from database.
exports.findAll = (req, res) => {
    const name = req.query.name
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Contact.find(condition)
        .then(contact => {
            res.send(contact)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || err500Message
            });
        });

};

// Retrieve single contact
exports.findOne = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)

    Contact.findOne(id)
        .then((contact) => {
            if (!contact) {
                res.status(404)
                    .send({ message: "Not found Contact with id " + id })
            }
            else
                res.send(contact)
        }).catch((err) => {
            res.status(500)
                .send({ message: "Error retrieving Contact with id=" + id });
        });
};

// Update a contact by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400)
            .send({ message: "Data to update can't be empty!" });
    }
    const id = mongoose.Types.ObjectId(req.params.id)

    Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(contact => {
            if (!contact) {
                res.status(404).send({
                    message: "Can't update contact with id=" + id + ". Contact wasn't found"
                });
            }
            else res.send({ message: "Contact was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating contact with id=" + id
            })
        })
};

// Delete a contact with the specified id in the request
exports.delete = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)

    Contact.findByIdAndRemove(id)
        .then(contact => {
            if (!contact) {
                res.status(404).send({
                    message: "Can't delete contact with id=" + id + ". Contact wasn't found"
                });
            }
            else res.send({ message: "Contact was deleted successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error delete contact with id=" + id
            })
        })
};

// Delete all contact from the db
exports.deleteAll = (req, res) => {
    Contact.deleteMany({})
        .then(contacts => {
            res.send({ message: "Contacts were deleted successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all contacts."
            })
        })
}


// TODO
// exports.findAllPublished = (res, req) => {
//     Contact.find({ published: true })
//         .then(contacts => {
//             res.send(contacts)
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving all contacts."
//             })
//         })
// }

