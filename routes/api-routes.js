var student = require('../models/student');
var course = require('../models/course');

var ObjectId = require('mongodb').ObjectID;

get_schema = (req) => {
    console.log(req);
    if (req.params.table_name == 'student') return student;
    else if (req.params.table_name == 'course') return course;

}

module.exports = function (app) {
        
    app.get('/:table_name', (req, res) => {

        /*get_schema(req, (schema) => {
            console.log(schema);*/

        if (req.params.table_name == 'student') schema = student;
        else if (req.params.table_name == 'course') schema = course;

            schema.find()
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(400).send({ message: err.message })
                })
        /*})*/
        
        
    });

    app.post('/:table_name', (req, res) => {

        if (req.params.table_name == 'student') schema = student;
        else if (req.params.table_name == 'course') schema = course;

        schema.collection.insertMany(req.body, function (err, data) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send(data);
            }
        })

       /* new_student.insertOne()
            .then((data) => {
                res.status(201).send(data);
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            });*/
    });

    app.put('/:table_name', (req, res) => {

        if (req.params.table_name == 'student') schema = student;
        else if (req.params.table_name == 'course') schema = course;

        if (req.query._id) {
            req.query._id = ObjectId(req.query._id)
        }

        schema.collection.updateMany(req.query, { $set: req.body }, function (err, data) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send(data);
            }
        })

    });

    app.delete('/:table_name', (req, res) => {

        var obj = {}

        if (req.query._id) {
            if (req.query._id.includes(',')) {
                obj = {
                    _id: {
                        $in: []
                    }
                }
                var arr = req.query._id.split(',');
                for (var i in arr) {
                    obj._id.$in.push(ObjectId(arr[i]))
                    console.log(ObjectId(arr[i]))
                }
            } else {
                obj = {
                    _id: ObjectId(req.query._id)
                }
            }

        } else {
            obj = req.query
        }

        if (req.params.table_name == 'student') schema = student;
        else if (req.params.table_name == 'course') schema = course;

        schema.collection.deleteMany(obj, (error, data) => {
            if (error) throw error;
            res.status(200).send(data)
        });
    });
}