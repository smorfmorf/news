const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const newsContainer = document.getElementById("news-container");
const newsContainer2 = document.getElementById("news");
const select = document.querySelector(".js-choice");

// Функция для загрузки новостей по заданному URL
async function loadNews(url) {
    try {
        const response = await fetch(url, {
            headers: { "X-Api-Key": "8bf6e7ac5204471e82a26814d84de14e" },
        });

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
        return [];
    }
}

// Функция для отображения новостей в контейнере
function displayNews(news) {
    newsContainer.innerHTML = "";
    news.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("child");

        const image = article.urlToImage
            ? `<img src="${article.urlToImage}" `
            : "";
        const date = new Date(article.publishedAt).toLocaleDateString();

        articleElement.innerHTML = `
                <a class='desc' href="${article.url}" target="_blank">
                    ${image}
                    <h2>${article.title}</h2>
                </a>
                <p class='text'>${article.description || "Неизвестно "}</p>
                <p>Автор: ${article.author || "Неизвестно"}</p>
                <p class='date'>Дата публикации: ${date}</p>
            `;

        newsContainer.append(articleElement);
    });
}

function displayNewsHead(news) {
    newsContainer2.innerHTML = "";

    news.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("child");

        const image = article.urlToImage
            ? `<img src="${article.urlToImage}"/>`
            : "";

        const date = new Date(article.publishedAt).toLocaleDateString();

        articleElement.innerHTML = `
        <a class='desc' href="${article.url}" target="_blank">
        ${image}
            <h2>${article.title}</h2>
        </a>
        <p class='text'>${article.description || "Неизвестно "}</p>
        <p>Автор: ${article.author || "Неизвестно"}</p>
        <p class='date'>Дата публикации: ${date}</p>
        
        `;
        newsContainer2.append(articleElement);
    });
}

select.addEventListener("change", async () => {
    const tagCountry = select.value;
    const headlinesUrl = `https://newsapi.org/v2/top-headlines?country=${tagCountry}`;

    const headlines = await loadNews(headlinesUrl);
    const headNews = headlines.slice(0, 4);
    displayNewsHead([...headNews]);
});

// Обработчик события отправки формы
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tagCountry = form.country.value;

    const query = searchInput.value;
    if (query === "") return;

    // Запрос на получение новостей по поисковому запросу
    const searchUrl = `https://newsapi.org/v2/everything?q=${query}`;
    // Запрос на получение заголовков
    const headlinesUrl = `https://newsapi.org/v2/top-headlines?country=${tagCountry}`;

    try {
        const [searchResults, headlines] = await Promise.all([
            loadNews(searchUrl),
            loadNews(headlinesUrl),
        ]);

        const searchNews = searchResults.slice(0, 8);
        // Ограничиваем количество заголовков до 4
        const headNews = headlines.slice(0, 4);
        // Отображаем результаты
        displayNews([...searchNews]);
        displayNewsHead([...headNews]);
    } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
    }
});

(async function () {
    const headlinesUrl = `https://newsapi.org/v2/top-headlines?country=ru`;

    const headlines = await loadNews(headlinesUrl);

    const headNews = headlines.slice(0, 8);
    // Отображаем результаты
    displayNewsHead([...headNews]);
})();
