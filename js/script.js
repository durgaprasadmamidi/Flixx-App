const global = {
    currentPage: window.location.pathname,
};

function highlightActiveLink(){
    if(global.currentPage === '/' || global.currentPage === '/index.html'|| global.currentPage === '/shows.html'){
        let navLink = document.querySelectorAll('.nav-link');
        navLink.forEach((a)=>{
            if(a.getAttribute('href')===global.currentPage){
                a.classList.add('active');
            }
        })
    }
}

//Fetch top movies
async function displayPopularMovies(){
    const {results} = await fetchAPIData('movie/popular');
    results.forEach((movie)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
                movie.backdrop_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

        document.querySelector('#popular-movies').appendChild(div);
    })
}

//Fetch top shoes
async function displayPopularShows(){
    const {results} = await fetchAPIData('tv/popular');
    results.forEach((show)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
                show.backdrop_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${show.backdrop_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.air_date}</small>
            </p>
          </div>
        `;

        document.querySelector('#popular-shows').appendChild(div);
    })
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//Fetch data from TMDB API
async function fetchAPIData(endpoint){
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = 'f19d94846ffb4f85ebad07578b0acf4f';
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hideSpinner();
    return data;
}


function init() {
    switch (global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init);