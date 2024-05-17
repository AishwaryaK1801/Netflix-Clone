
const trendingMovies = document.getElementById("trendingMovies");
   
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
                        <em class="my-5 hideOnMobile">
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




const fetchTrendingMovies =async()=>{
    let res= await makeApiCall(TRENDING_URL, "GET");
    cl(res)
    insertMainSliderItems(res.results);
    initSlider();
}

fetchTrendingMovies();













