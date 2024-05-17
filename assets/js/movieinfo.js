//SINGLE DATA iD >> rOUTES QUERY PARAMS
const singleMovie = document.getElementById("singleMovie");
const figcaption = document.querySelector(".singleMovieContainer figcaption")


const getMovieInfo =async () => {
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search)    
    let MOVIE_ID = queryParams.get('movieId')    
    let SINGLE_MOVIE_URL =`${BASE_URL}/movie/${MOVIE_ID}?api_key=${API_KEY}`;
    let CAST_CREW_URL = `${BASE_URL}/movie/${MOVIE_ID}/credits?api_key=${API_KEY}`

    // let movieObj =await makeApiCall(SINGLE_MOVIE_URL, "GET");
    // let castAndCrew = await makeApiCall(CAST_CREW_URL, "GET")

    let apiArr=[
        makeApiCall(SINGLE_MOVIE_URL, "GET"),
        makeApiCall(CAST_CREW_URL, "GET")
    ];
    
    let [movieObj, castCrewObj]= await Promise.all(apiArr)
    figcaption.innerHTML =`
    <div>
    <img src="https://image.tmdb.org/t/p/w342${movieObj.production_companies[0].logo_path}" 
  alt="${movieObj.title || movieObj.original_title || movieObj.original_name}
  title="${movieObj.title || movieObj.original_title || movieObj.original_name}"
  " class="movieLogo mb-4">
  <h4 class="title mb-4">
  ${movieObj.title || movieObj.original_title || movieObj.original_name}
  </h4>
  <ul class="details">
    <li>${movieObj.release_date}</li>
    <li>
      <span>${movieObj.adult?'A' : 'U/A'}</span>
    </li>
    <li>
      ${movieObj.runtime}
    </li>
    <li class="genresList">
      ${movieObj.genres.map(gen => `<span data-id='${gen.id}'>${gen.name}</span>`).join(", ")}
    </li>
  </ul>
  <p class="overview">
  ${movieObj.overview}
  </p>
  <p class="staring">
    <strong>Staring :${castCrewObj.cast.slice(0,5).map(cast=>cast.name || cast.original_name)}</strong>
  </p>
  </div>
    `;
    
    let bannerImg = `${IMG_URL}/original/${movieObj.poster_path || movieObj.backdrop_path}`;
    singleMovie.style.backgroundImage=`url(${bannerImg})`
}
getMovieInfo();

