const bodyParser = require('body-parser');
const exp = require('constants');
const express = require('express');
const path = require('path');
const Contact = require('./config/models/contact');
const port = 8000;

const db = require('./config/mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [{
        name: 'Shyam',
        phone: '9865327410'
    },
    {
        name: 'Ram',
        phone: '9865856410'
    }, {
        name: 'Hanuman',
        phone: '9142327410'
    }
]

app.get('/', function(req, res) {

    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log('Error in fetching Contacts from db');
            return;
        }
        return res.render('home', {
            title: "A Contact List",
            contact_list: contacts
        });
    });

});

app.post('/create-contact', function(req, res) {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if (err) {
            console.log('error in creating a contact');
            return;
        }

        console.log('********', newContact);
        return res.redirect('back');
    });


});

// for deleting a contact
app.get('/delete-contact', function(req, res) {
    //Get the id from query in the url
    let id = req.query.id;

    //find the contact in db using id and delete
    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    });

});

app.listen(port, function(err) {
    if (err) {
        console.log('Error in the running the serve ', )
    }

    console.log('Yup! My Express server is running on Port: ', port);
});