
let cl=console.log;

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `36bd279c2debf6d654ea420dae19db03`;
const IMG_URL = `https://image.tmdb.org/t/p`;
const TRENDING_URL =`${BASE_URL}/trending/all/week?api_key=${API_KEY}`;

const makeApiCall = async (apiUrl, methodName, msgBody) =>{
    msgBody = msgBody ? JSON.stringify(msgBody) : null;
    let res = await fetch(apiUrl, {
        method : methodName,
        body : msgBody
    })
    return res.json();    
}


