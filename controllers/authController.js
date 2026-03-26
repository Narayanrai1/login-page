const userDb = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users=data;}
}
const bcrypt = require('bcrypt');

const handleLogin = async (req,res)=>
{
    const {user , pwd} = req.body;4
    console.log(user);
    console.log(pwd);
    if(!user||!pwd) return res.status(400).send("kuch to likh na bhadwe");
    
    try{

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
                
                const match = await bcrypt.compare(pwd,foundUser.pwd);
                if (match) {
                    res.json({ 'success': `User ${user} is logged in!` });
                } else {
                    res.status(401).send("accha");
                }
    }
    catch(err){
        console.log(err.message);
    }
}
// handleLogin();
module.exports = {handleLogin};
