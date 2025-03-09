import "./styles.css";

const apiKeyWeather = 'YLXE9DSHRKEVZ7PCMNGMXTJ85';
const apiKeyGif = 'IuiLkuHL5ePGvryGmzoHouVhIzCowyMW';
const img = document.querySelector('img');
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const errorMsg = document.getElementById('errorMsg');
const defaultGif = 'https://media.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif';

img.src = defaultGif;

async function getNewGif(query = 'vancouver') {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKeyGif}&s=${encodeURIComponent(query)+'city'}`;
    try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cityGif = await response.json();
        img.src = cityGif.data.images.original.url;
    } catch (error) {
        console.error('Error fetching the GIF:', error);
        errorMsg.textContent = 'Failed to fetch GIF. Please try again.';
        img.src = defaultGif; // Fallback to default GIF on error
    }
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