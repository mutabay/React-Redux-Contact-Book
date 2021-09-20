module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
    var router = require("express").Router();

    // Create a new contact
    router.post("/", contacts.create)

    // Retrieve all contacts
    router.get("/", contacts.findAll)

    // Retrieve a single contact with id
    router.get("/:id", contacts.findOne)

    // Update a contact with id 
    router.put("/:id", contacts.update)

    router.delete("/:id", contact.delete)

    router.delete("/", contacts.deleteAll)

    app.use("/api/contacts", router)
};