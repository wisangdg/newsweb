const apiKey = 'd4204d98aee44af0abc7cecdf8c5dfd5';
const newsGrid = document.getElementById('news-grid');
let timeoutId;


async function fetchNews(query = '') {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&q=${query}&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok') {
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                newsGrid.innerHTML = '<p>No news found.</p>';
            }
        } else {
            throw new Error(data.message || 'Error fetching news');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsGrid.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}


function displayNews(articles) {
    newsGrid.innerHTML = '';

    articles.forEach(article => {
        const { title, description, urlToImage, url } = article;

        const articleEl = document.createElement('div');
        articleEl.classList.add('news-card', 'card');


        const imageEl = document.createElement('img');
        imageEl.src = urlToImage || 'default_image_url';
        imageEl.alt = title || 'News Image';
        imageEl.classList.add('card-img-top');


        const cardBody = document.createElement('div');
        cardBody.classList.add('news-card-body', 'card-body');


        const titleEl = document.createElement('h5');
        titleEl.classList.add('news-card-title', 'card-title');
        titleEl.innerHTML = `<a href="${url}" target="_blank">${title || 'No Title Available'}</a>`;


        const descriptionEl = document.createElement('p');
        descriptionEl.classList.add('news-card-text', 'card-text');
        descriptionEl.textContent = description || 'No description available';


        cardBody.appendChild(titleEl);
        cardBody.appendChild(descriptionEl);
        articleEl.appendChild(imageEl);
        articleEl.appendChild(cardBody);


        newsGrid.appendChild(articleEl);
    });
}


function liveSearch(event) {
    event.preventDefault();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const query = document.getElementById('search-input').value;
        fetchNews(query);
    }, 400);
}


document.getElementById('search-input').addEventListener('input', liveSearch);

document.getElementById('search-form').addEventListener('submit', liveSearch);

document.addEventListener('DOMContentLoaded', () => {
    if (newsGrid) {
        fetchNews();
    } else {
        console.error('Element with ID "news-grid" not found');
    }
});
