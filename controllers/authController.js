const userDb = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users=data;}
}
const bcrypt = require('bcrypt');

const handleLogin = async (req,res)=>
{
    const {user , pwd} = req.body;
    if(!user||!pwd) return res.status(400).send("kuch to likh na bhadwe");
    const duplicate = function ()
    {
        for(let i=0;i<userDb.users.length;i++)
        {
            if(userDb.users[i].username===user)
            {
                return userDb.users[i];
            }
        }
        return null;
    }   
    const foundUser = duplicate();
    if(!foundUser) return res.status(401).send("accha");
    const match = await bcrypt.compare(pwd,duplicate.password);
    if (match) {
        res.json({ 'success': `User ${user} is logged in!` });
    } else {
        res.sendStatus(401);
    }
}
module.exports = {handleLogin};
