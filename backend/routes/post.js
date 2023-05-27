const router = require('express').Router();
const Post = require('../models/Post')


//create post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {

        res.status(500).json(error.message);
    }
})



//update
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.
            findById(req.params.id);
        if (post.username == req.body.
            username) {
            try {
                const updatedPost =
                    await Post.
                        findByIdAndUpdate(
                            req.params.id, {
                            $set: req.body,
                        },
                            { new: true }
                        );
                res.status(200).json
                    (updatedPost);

            } catch (error) {
                res.status(500).json
                    (error);

            }
        } else {
            res.status(404).json('you can update only your post')
        }


    } catch (error) {
        res.status(500).json
            (error);
    }
})


//delete

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.
            findById(req.params.id);
        if (post.username == req.body.
            username) {
            try {
               await post.delete();
               res.status(200).json("Post has been deleted")


            } catch (error) {
                res.status(500).json
                    (error);

            }
        } else {
            res.status(404).json('you can delete only your post')
   }


    } catch (error) {
        res.status(500).json
            (error);
    }
})




//GET individual post POST

router.get("/:id", async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
        res.status(200).json(post);

    } catch (error) {


        res.status(500).json(error.message);
    }

})


//GET All POSTS

router.get('/', async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts = await Post.find()

         res.status(200).json(posts.reverse())
    } catch (error) {

        res.status(400).json(error.message)

    }
})



module.exports = router;
