const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises'   )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MonogoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema, 'courses');

// Await method =================
// async function getCourses() {
//     return await Course
//         .find()
//         .sort({name: 1})
//         .select({name: 1, author: 1})
// }
// async function run(){
//     const courses = await getCourses();
//     console.log(courses);
// }
// run();

// Promise method ===============
new Promise((resolve, reject) => {
    Course
        .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
        .sort({price: -1})
        .select({name: 1, price: 1})
        .then(courses => console.log(courses))
        .catch((err) =>  console.log('query did not'));
});



