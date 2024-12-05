const express = require("express")
const router = express.Router()
const Article = require('./../Models/articles')

router.get('/newArticle', (req, res) => {
    res.render('articles/newArticle', { article: new Article() })
})

// router.get('/:id',(req,res)=>{
//     res.send(req.params.id)
// })
router.post('/articles', async (req, res) => {
    try {
        const { title, discription } = req.body;
        const article = new Article({ title, discription });
        await article.save();
        res.redirect('/articles/'); // Redirect to display page
    } catch (error) {
        res.status(500).send('Error saving user: ' + error.message);
    }
});
router.get('/articles', async (req, res) => {
    try {
        const article = await Article.find().sort({date:'descending'});
        res.render('articles/index', { article }); // Pass data to EJS
    } catch (error) {
        res.status(500).send('Error retrieving users: ' + error.message);
    }
});

//delete opration


router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        await Article.findByIdAndDelete(id); 
        res.redirect('/articles'); 
    } catch (error) {
        res.status(500).send('Error deleting article: ' + error.message);
    }
});


//edit operaton


router.post('/articles/:id/edit', async (req, res) => {
    try {
        const { title, discription } = req.body;
        await Article.findByIdAndUpdate(req.params.id, { title, discription });
        res.redirect('/articles'); 
    } catch (error) {
        res.status(500).send('Error updating article: ' + error.message);
    }
});
router.get('/articles/:id/edit', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.render('articles/editArticle', { article }); 
    } catch (error) {
        res.status(404).send('Article not found: ' + error.message);
    }
});





module.exports = router                                       
