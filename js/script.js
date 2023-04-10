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
    console.log(results);
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



//Fetch data from TMDB API
async function fetchAPIData(endpoint){
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = 'f19d94846ffb4f85ebad07578b0acf4f';

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
}


function init() {
    switch (global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
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