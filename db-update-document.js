const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises'   )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MonogoDB...', err));

const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema, 'courses');

// Await method =================
async function updateCourse(id) {
    const result = await Course.update({_id: id}, {
        $set: {
            author: 'Mosh',
            isPublished: true
        }
    }); 
    console.log(result);   
}
updateCourse('5a68fdf95db93f6477053ddd');

// Promise method
// new Promise((resolve, reject) => {
//     Course.findById('5a68fdf95db93f6477053ddd')
//     .then((course) =>{
//         course.author = 'Tata Mata6';
//         console.log(course)
//         course
//             .save()    
//             .then(console.log('Course saved xoxo...'))
//     })    
//     .catch(err => console.log(err));
// });