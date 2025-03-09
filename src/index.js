import "./styles.css";

const apiKeyWeather = 'YLXE9DSHRKEVZ7PCMNGMXTJ85';
const apiKeyGif = 'bb2006d9d3454758be1a99cfad65913d';
const img = document.querySelector('img');
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const errorMsg = document.getElementById('errorMsg');
const defaultGif = 'https://media.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif';

async function getNewGif(query = vancouver) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKeyGif}=${encodeURIComponent(query)}`, {mode: 'cors'});
    const cityGif = await response.json();
    img.src = cityGif.data.images.url;
}

getNewGif();

function handleSearch() {
    const query = searchBox.value.trim();
    if (query) {
        getNewGif(query);
    }
}

searchBtn.addEventListener("click", handleSearch);

searchBox.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});