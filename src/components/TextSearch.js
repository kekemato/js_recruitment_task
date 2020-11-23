export default class TextSearch {
    constructor(app) {
        this.app = app;
        this.newsContentSearch = document.getElementById('newsContentSearch');
        this.boundSearchHandler = this.handleSearchChange.bind(this);
        this.newsContentSearch.addEventListener('change', this.boundSearchHandler);
    }

    handleSearchChange(event) {
        if (this.app.state.searchText !== event.target.value) {
            this.app.state.searchText = event.target.value;
            this.app.state.currentPage = 1;
            this.app.getData();
        }
        this.newsContentSearch.removeEventListener(
            'change',
            this.boundSearchHandler
        );
    }
}
