const newsContentSearch = document.getElementById('newsContentSearch');

export default class TextSearch {
    constructor(app) {
        this.app = app;
        this.boundSearchHandler = this.handleSearchChange.bind(this);
        newsContentSearch.addEventListener('change', this.boundSearchHandler);
    }

    handleSearchChange(event) {
        if (this.app.state.searchText !== event.target.value) {
            this.app.state.searchText = event.target.value;
            this.app.state.currentPage = 1;
            this.app.getData();
        }
        newsContentSearch.removeEventListener('change', this.boundSearchHandler);
    }
}
