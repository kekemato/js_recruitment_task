import Article from './components/Article';
import Pagination from './components/Pagination';
import ReadLaterArticle from './components/ReadLaterArticle';
import TextSearch from './components/TextSearch';
import SectionSelect from './components/SectionSelect';

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
    }

    getReadLaterArticlesList() {
        const readLaterList = document.getElementById('readLaterList');
        readLaterList.innerHTML = '';

        const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));

        if (savedArticles.length === 0 || !savedArticles) {
            const noMatchText = document.createElement('p');
            noMatchText.innerHTML = 'There is nothing here, yet.';
            readLaterList.appendChild(noMatchText);
        }

        savedArticles.map(({ header, url, id }) => {
            const newArticle = new ReadLaterArticle(header, url, id, this);
            readLaterList.appendChild(newArticle.htmlElement);
        });
    }

    getArticlesList() {
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';
        if (this.state.articles.length === 0) {
            const noMatchText = document.createElement('p');
            noMatchText.innerHTML = 'No records found matching the search criteria.';
            newsList.appendChild(noMatchText);
        }
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
        new Pagination(currentPage, pages, this);
    }

    getTextSearch() {
        new TextSearch(this);
    }

    getSectionSelect() {
        new SectionSelect(this);
    }

    getLoader() {
        const loader = document.createElement('div');
        loader.classList.add('loader');
        loader.id = 'loader';
        const newsList = document.getElementById('newsList');
        newsList.appendChild(loader);
    }

    removeLoader() {
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';
    }

    showSnackbar() {
        const snackbar = document.getElementById('snackbar');
        snackbar.className = 'visible';
        setTimeout(
            () => (snackbar.className = snackbar.className.replace('visible', '')),
            3000
        );
    }

    render() {
        this.getArticlesList();
        this.getPagination();
        this.getTextSearch();
        this.getSectionSelect();
        this.getReadLaterArticlesList();
    }

    getFromDate() {
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
        const { fromDate } = this.getFromDate();
        const { currentPage, section, searchText } = this.state;
        this.getLoader();
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
            .then(() => {
                this.removeLoader();
                this.render();
            })
            .catch(() => {
                this.showSnackbar();
                this.removeLoader();
                this.render();
            });
    }
}
