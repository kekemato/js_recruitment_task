export default class SectionSelect {
    constructor(app) {
        this.app = app;
        this.sectionSelect = document.getElementById('sectionSelect');
        this.boundSectionChangeHandler = this.handleSectionChange.bind(this);
        this.sectionSelect.addEventListener(
            'change',
            this.boundSectionChangeHandler
        );
    }

    handleSectionChange(event) {
        if (this.app.state.section !== event.target.value) {
            this.app.state.section = event.target.value;
            this.app.state.currentPage = 1;
            this.app.getData();
        }
        this.sectionSelect.removeEventListener(
            'change',
            this.boundSectionChangeHandler
        );
    }
}
