async function loadNews() {
    try {
        //response.json() - возвращает Promise с obj ,  await - дожидается выполнения Promise
        const response = await fetch("./head.json"); //Response
        const data = await response.json(); // {status: 'ok', totalResults: 30, articles: Array(20)}
        return data.articles; //(20) [{…}, {…}, {…}]
    } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
        return [];
    }
}

async function load() {
    const [searchResults, headlines] = await Promise.all([
        loadNews(),
        loadNews(),
    ]);
    console.log(searchResults, headlines);
    //(20) [{…}, {…}, {…}]
    //(20) [{…}, {…}, {…}]
}
load();
