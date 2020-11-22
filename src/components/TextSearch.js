export default class TextSearch {
    constructor(app) {
        this.app = app;
        this.setListener();
    }

    handleSearchChange(event) {
        if (this.app.state.searchText !== event.target.value) {
            this.app.state.searchText = event.target.value;
            this.app.state.currentPage = 1;
            this.app.getData();
        }
    }

    setListener() {
        document
            .getElementById('newsContentSearch')
            .addEventListener('change', (event) => this.handleSearchChange(event));
    }
}
