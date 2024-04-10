const User = require('../models/user')
const auth = require('../auth')

const newUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPass = await auth.bcrypt.hash(req.body.password, 10)

    User.find({username: username})
    .then(result => {
        if(result.length !== 0){
            res.json('Username Taken')
        }else{
            const userDetails = {
                'username' : username,
                'password' : hashedPass,
                'profile_pic' : 'http://res.cloudinary.com/djg9ttgrn/image/upload/c_crop,h_0.9306654257794323,w_0.9306654257794323,x_0.03466728711028385,y_0.05444392740809679/v1712280077/s8vwpudk7bhwkp0axgng.jpg',
                'online' : false,
                'friends' : []
            }
            const newUser = new User(userDetails)
            newUser.save()
            .then(
                res.json('saved')
            )
            .catch(err => console.log(err))
        }
       })
    .catch(err => res.status(500).json(err))


}

const loginUser = (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.find({username : username})
    .then(async (user) => {
        if(user.length === 0){
            res.json('Wrong Username')
        }else{
        const hashedPass = user[0].password
        const match = await auth.bcrypt.compare(password, hashedPass);
        if(!match){
            res.json('Wrong Password!')
        }else{
            const token = auth.jwt.sign({userId : user[0]._id}, process.env.SECRET);
            res.cookie('jwt', token, { httpOnly: true, path: '/'});
            res.json('success')  
        }}
    })
    .catch(err => res.json('Error'))

}

const signOut = (req,res) => {
        res.cookie('jwt', '', { maxAge: 0, path: '/'})
        res.json()
}

const logoutUser = (req, res) => {
    res.clearCookie('jwt', { 
        expires: new Date(0),
        path: '/', 
        secure: true,
        httpOnly: true
    });
    res.status(200).json()
}
module.exports = {
    newUser,
    loginUser,
    signOut,
    logoutUser
}