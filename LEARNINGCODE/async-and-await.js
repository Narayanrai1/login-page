const promise = new Promise((resolve , reject)=>
{
    let success= true;
    if(success)
    {
        resolve("lello world");
    }
    else 
    {
        reject("error");
    }
})

/*This is the method 1 to fetch data here the promise is a class 
so first make a new promise object and then there are two constructor
inside them resolve and reject which are store many things like 
json , array , number , string and then we can get it by like this 
.then function 
.catch function inside the class
.then require result and .catch require error
*/
promise
    .then(result => console.log(result))
    .catch(error => console.log(error));
console.log("hello world");

/*This is the another method for this where we make a async fucntion
to run so that it will await for the promise and then we can use it 
DON'T FORGET TO CALL THE FUNCTION
*/
async function getData()
{
    const data = await promise;
    console.log(data);
}
getData();