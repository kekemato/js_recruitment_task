export default class Pagination {
    constructor(currentPage, pages, handlePageChange) {
        this.state = {
            currentPage,
            pages,
        };
        this.handlePageChange = handlePageChange;
        this.getOptions();
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
