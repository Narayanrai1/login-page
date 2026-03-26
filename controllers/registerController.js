const userDb ={
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}
}
// const newUser = {"id":3,"name":"Pushpendra"};
// userDb.setUsers([...userDb.users,newUser])
// console.log(userDb.users[0]);
const bcrypt = require('bcrypt');
const fsPromise = require('fs').promises;
const path = require('path');

const handlenewUser = async (req,res)=>
{
    const {user, pwd} = req.body;
    if(!user||!pwd) return res.status(400).send(`kuch to likh na bhadwe`);
    let duplicate = false;

    for (let i = 0; i < userDb.users.length; i++) {
        if (userDb.users[i].username === user) {
            duplicate = true;
            break;
        }
    }
    if(duplicate)
    {
       return res.sendStatus(409)
    }
    try{
        const hashedpwd = await bcrypt.hash(pwd,1);
        const newUser = {"username": user , "pwd":hashedpwd};
        userDb.setUsers([...userDb.users,newUser]);
        await fsPromise.writeFile(
            path.join(__dirname,'..','model/users.json'),JSON.stringify(userDb.users)
        )
        console.log(userDb.users);
        res.status(201).send(`Congrats , new user ${user} is created`);
    }
    catch(err)
    {
        return res.send(err);
    }
}
module.exports = {handlenewUser};