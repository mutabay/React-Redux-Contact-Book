const mongoose = require('mongoose');
const { isEmail } = require('validator');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter name for your contact.'],
        minlength: [5, 'Please enter at least 5 character for product name.'],
        maxlength: [255, 'You can enter maximum 255 character for product name.'],
        trim: true
    },
    email: {
        type: String,
        require: [true, 'Please enter email of your contact.'],
        validate: [isEmail, 'Invalid email']
    }, 
    phone: {
        type: String,
        require: [true, 'Please enter phone number of your contact.'],
        // Add      isMobilePhone(str [, locale [, options]])
    }
});

// Changing id field and eliminating version key(__V)
contactSchema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Contact', contactSchema)