const express = require('express');
const articleRouter=require('./routes/articles')
const mongoose =require('mongoose')
const path=require('path')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//conection db
mongoose.connect('mongodb://localhost:27017/blog',console.log('database connected'))
app.use(express.urlencoded({extended: false}))


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))
app.use(articleRouter)
//  router

app.get('/', (req, res) => {
    const article=[{
        title:"article title",
        date:new Date(),
        discription:'article discription'
    },
    {
        title:"article title 2",
        date:new Date(),
        discription:'article discription'
    },
    {
        title:"article title 3",
        date:new Date(),
        discription:'article discription'
    }
]
    res.render('articles/index',{article:article}); // This will look for views/index.ejs
});



app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
