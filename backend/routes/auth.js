
const router = require('express').Router();
const User = require('../models/User')

const bcrypt = require('bcrypt'); //used for password hashing


//USER REGISTER
router.post('/register',async(req,res)=>{

    try {
        const salt = await bcrypt.genSalt(10); //generates salt value
        const hashedPass = await bcrypt.hash(req.body.password,salt) //convert pass into hash value

        const newUser = new User(
            {
                username:req.body.username,
                email:req.body.email,
                password:hashedPass,
    });

            const user = await newUser.save();
            res.status(200).json(user);

    } catch (error) {

        res.status(500).json(error.message);
        console.log(error.message)

    }
});



//USER LOGIN ::: Throw Error when wrong credentials
// ques how we can use if else block in this method because generates server error during wron credentials
router.post('/login',async(req,res)=>{
    try {

        const user = await User.findOne({username:req.body.username});
        const validated = await bcrypt.compare(req.body.password, user.password);

        if(!user){
             res.status(400).json('Wrong credentia');
        }

       else if (!validated ){
            res.status(400).json('Wrong credentials');
        }

   else{

     const {password, ...others} =user._doc;

     res.status(200).json(others);}


    } catch (error) {
        res.status(500).json(error.message);

    }
})



module.exports =router;
