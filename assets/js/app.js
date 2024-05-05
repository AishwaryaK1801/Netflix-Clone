let cl=console.log;

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `36bd279c2debf6d654ea420dae19db03`;
const IMG_URL = `https://image.tmdb.org/t/p`;
const TRENDING_URL =`${BASE_URL}/trending/all/week?api_key=${API_KEY}`;


const trendingMovies = document.getElementById("trendingMovies");


// let obj =
// {
//         "adult": false,
//         "backdrop_path": "/xnAi4BRoO3ZQ3wwxGn6UNoxQzDq.jpg",
//         "genre_ids": [
//             80,
//             28
//         ],
//         "id": 823999,
//         "original_language": "it",
//         "original_title": "Diabolik - Ginko all'attacco!",
//         "overview": "Diabolik nearly gets caught in Inspector Ginko's latest trap, leaving his partner in crime Eva Kant behind in the escape. Furious, Eva offers Ginko her help in capturing the King of Terror, but the former has to face the return of an old flame of his.",
//         "popularity": 527.561,
//         "poster_path": "/8QVbWBv94BAT9u1q9uJccwOxMzt.jpg",
//         "release_date": "2022-11-17",
//         "title": "Diabolik - Ginko Attacks",
//         "video": false,
//         "vote_average": 5.7,
//         "vote_count": 108
//     }
  
    

const initSlider = () =>{
    $('#trendingMovies').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
        
            1000:{
                items:1
            }
        }
    })
}

const loadQueryParams =(ele)=>{
let id = ele.dataset['id'];
cl(id);

let currentUrl = new URL(window.location.href);
let queryParams = new URLSearchParams(currentUrl.search);
queryParams.set("movieId", id);
currentUrl.search=queryParams.toString();
let movieRedirectUrl = `${currentUrl.origin}/movieinfo.html${currentUrl.search}`;

window.location.href=movieRedirectUrl;
}

 
const insertMainSliderItems =(arrOfMovies) => {

    trendingMovies.innerHTML = arrOfMovies
    .map(movie => {
        return `
        <div class="item">

                <figure class="mb-0 movieCard">
                    <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}" alt="">
                    <figcaption>
                        <h3 class="display-3">
                        ${movie.title || movie.original_title || movie.original_name }
                        </h3>
                        <em class="my-5">
                         ${movie.overview}
                        </em>
                    <p> 
                        <button data-id="${movie.id}" class="btn btn-large btn-red" onclick="loadQueryParams(this)">View more</button>
                    </p>
                    </figcaption>
                </figure>
            </div>
        `;
    }).join('');

}

const makeApiCall = async (apiUrl, methodName, msgBody) =>{
    msgBody = msgBody ? JSON.stringify(msgBody) : null;
    let res = await fetch(apiUrl, {
        method : methodName,
        body : msgBody
    })
    return res.json();
    
}



const fetchTrendingMovies =async()=>{
    let res= await makeApiCall(TRENDING_URL, "GET");
    cl(res)
    insertMainSliderItems(res.results);
    initSlider();
}

fetchTrendingMovies();













