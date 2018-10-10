const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground'   )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MonogoDB...', err));

// Create Schema for a collection
const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length > 0;
            },
            message: 'Please add at least one tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {return this.isPublished},
        min: 10,
        max:200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

// Create Class based on the schema
const Course = mongoose.model('Course', courseSchema);

// Create single document based on the class ==================
async function createCourse() {
    const course = new Course({
        name: 'Front End JS course',
        author: 'Mateja',
        // tags: ['react', 'angular'],
        category: 'web',
        isPublished: true,
        price: 15
    });
    try {
        const result = await course.save();
        console.log(result);
    } catch(err){
        console.log('Error message: ',err.errors);
    }
    
    
}
createCourse();

// Query (Filtering) documents =================
async function getCourses(){
    /****** TO QUERY ALL DOCUMENTS ******/
    // const courses = await Course.find();

    // const courses = await Course.find({author: "Mateja", name: "mongodb-demo-2"});
    const courses = await Course
        .find({author: "Mateja", name: "mongodb-demo-2"})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1})
    console.log(courses);
}
// getCourses();


// NON MONGOOSE WAY =======================

// MongoClient.connect('mongodb://localhost:27017/playground', (err, db) => {
// 	if(err) {
// 		return console.log('Unable to connect MongoDB server');
// 	} 
// 	console.log('Connected to MongoDB server');

// 	db.collection('courses').find({
// 		_id: new ObjectID('5bac3d0f88f54225b23f10ed')
// 	}).count().then((count) => {
// 		console.log(`Todos count: ${count}`);
// 	}, (err) => {
// 		console.log('Unable to fetch todos', err);
// 	});

// 	// db.close();
// });
