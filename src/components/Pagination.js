export default class Pagination {
    constructor(currentPage, pages, app) {
        this.state = {
            currentPage,
            pages,
        };
        this.app = app;
        this.getOptions();
        this.setListener();
    }

    handlePageChange(event) {
        this.app.state.currentPage = event.target.value;
        this.app.getData();
    }

    setListener() {
        document
            .getElementById('activePageSelect')
            .addEventListener('change', (event) => this.handlePageChange(event));
    }

    getOptions() {
        const { pages, currentPage } = this.state;
        const select = document.getElementById('activePageSelect');
        select.innerHTML = '';
        for (let i = 1; i <= pages; i++) {
            const newOption = document.createElement('option');
            newOption.value = i;
            newOption.innerText = i;
            newOption.selected = currentPage === i ? true : false;
            select.appendChild(newOption);
        }
    }
}
