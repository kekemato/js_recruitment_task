import Article from './components/Article';
import Pagination from './components/Pagination';
import ReadLaterArticle from './components/ReadLaterArticle';

export default class App {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.state = {
            pages: null,
            currentPage: 1,
            section: '',
            searchText: '',
            articles: [],
        };

        this.getData();
        this.setListeners();
    }

    handlePageChange(event) {
        this.state.currentPage = event.target.value;
        this.getData();
    }

    handleSectionChange(event) {
        this.state.section = event.target.value;
        this.state.currentPage = 1;
        this.getData();
    }

    handleSearchChange(event) {
        this.state.searchText = event.target.value;
        this.state.currentPage = 1;
        this.getData();
    }

    setListeners() {
        document
            .getElementById('activePageSelect')
            .addEventListener('change', (event) => this.handlePageChange(event));

        document
            .getElementById('sectionSelect')
            .addEventListener('change', (event) => this.handleSectionChange(event));

        document
            .getElementById('newsContentSearch')
            .addEventListener('change', (event) => this.handleSearchChange(event));
    }

    getReadlaterArticlesList() {
        const readLaterList = document.getElementById('readLaterList');
        readLaterList.innerHTML = '';
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
        savedArticles.map(({ header, url, id }) => {
            const newArticle = new ReadLaterArticle(header, url, id, this);
            readLaterList.appendChild(newArticle.htmlElement);
        });
    }

    getArticlesList() {
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';
        this.state.articles.map(
            ({ webUrl, webTitle, webPublicationDate, sectionName, id }) => {
                const publicationDate = webPublicationDate
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('.');
                const newArticle = new Article(
                    webTitle,
                    sectionName,
                    publicationDate,
                    webUrl,
                    id,
                    this
                );
                newsList.appendChild(newArticle.htmlElement);
            }
        );
    }

    getPagination() {
        const { currentPage, pages } = this.state;
        new Pagination(currentPage, pages, this.handlePageChange);
    }

    render() {
        this.getArticlesList();
        this.getPagination();
        this.getReadlaterArticlesList();
    }

    getDates() {
        const dateFrom = new Date(new Date().setDate(new Date().getDate() - 30));
        const timezoneOffset = dateFrom.getTimezoneOffset();
        const correctDate = new Date(
            dateFrom.getTime() - timezoneOffset * 60 * 1000
        );
        const dates = {
            fromDate: correctDate.toISOString().split('T')[0],
        };
        return dates;
    }

    getData() {
        const { fromDate } = this.getDates();
        const { currentPage, section, searchText } = this.state;
        const sectionParam =
      section === '' || section === 'all' ? '' : `&section=${section}`;
        const searchTextParam = searchText ? `&q=${searchText}` : '';
        const url = `https://content.guardianapis.com/search?from-date=${fromDate}&page=${currentPage}${sectionParam}${searchTextParam}&api-key=${this.apiKey}`;
        fetch(url)
            .then((response) => response.json())
            .then(({ response: { pages, results, currentPage } }) => {
                this.state.currentPage = currentPage;
                this.state.pages = pages;
                this.state.articles = results;
            })
            .then(() => this.render());
    }
}
