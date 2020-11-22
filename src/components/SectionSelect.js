export default class SectionSelect {
    constructor(app) {
        this.app = app;
        this.setListener();
    }

    handleSectionChange(event) {
        if (this.app.state.section !== event.target.value) {
            this.app.state.section = event.target.value;
            this.app.state.currentPage = 1;
            this.app.getData();
        }
    }

    setListener() {
        document
            .getElementById('sectionSelect')
            .addEventListener('change', (event) => this.handleSectionChange(event));
    }
}
