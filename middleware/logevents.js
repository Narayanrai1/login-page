const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');


const logevents = async(message , logName)=>
{
    const dateTime = `${format(new Date(),'yyyy-MM-dd\tHH:mm:ss')}`;
    const logitem =`${dateTime} , ${uuid()} , ${message}`;
    try
    {
        if(!fs.existsSync(path.join(__dirname,'..','/logs')))
        {
            await fsPromise.mkdir(__dirname,'..','logs');
        }
        await fsPromise.appendFile(path.join(__dirname,'logs','..',logName),logitem);
    }
    catch(err)
    {
        console.log(err);
    }
}
const logger = (req,res,next)=>
{
    logevents(`${req.method}\t${req.headers.origin}\t${req.url}`,'logging.txt');
     console.log(`${req.method} ${req.path}`);
    next();
}
module.exports = {logger,logevents};