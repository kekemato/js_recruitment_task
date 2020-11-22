export default class Pagination {
    constructor(currentPage, pages, app) {
        this.state = {
            currentPage,
            pages,
        };
        this.app = app;
        this.render();
        this.setListener();
    }

    handlePageChange(event) {
        if (this.app.state.currentPage !== event.target.value) {
            this.app.state.currentPage = event.target.value;
            this.app.getData();
        }
    }

    setListener() {
        document
            .getElementById('activePageSelect')
            .addEventListener('change', (event) => this.handlePageChange(event));
    }

    render() {
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
