const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const contactSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;