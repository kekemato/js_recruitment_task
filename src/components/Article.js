export default class Article {
    constructor(header, sectionName, publicationDate, url, id, app) {
        this.state = {
            header,
            sectionName,
            publicationDate,
            url,
            id,
        };
        this.app = app;
        this.boundSaveArticleToReadLater = this.saveArticleToReadLater.bind(this);
        this.htmlElement = this.render();
    }

    saveArticleToReadLater(article) {
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
        if (!savedArticles?.find((item) => item.id === article.id))
            localStorage.setItem(
                'savedArticles',
                JSON.stringify(savedArticles ? [...savedArticles, article] : [article])
            );
        this.app.getReadLaterArticlesList();

        const newArticle = document.getElementById(article.id);
        newArticle.removeEventListener('click', () => {
            this.boundSaveArticleToReadLater(this.state);
        });
    }

    render() {
        const { header, sectionName, publicationDate, url, id } = this.state;
        const template = `
        <article class="news">
        <header>
            <h3>${header}</h3>
        </header>
        <section class="newsDetails">
            <ul>
                <li><strong>Section Name:</strong> ${sectionName}</li>
                <li><strong>Publication Date:</strong> ${publicationDate}</li>
            </ul>
        </section>
        <section class="newsActions">
            <a href="${url}" class="button">Full article</a>
            <button class="button button-outline" id=${id}>Read Later</button>
        </section>
        </article>
    `;

        const newArticle = document.createElement('li');
        newArticle.innerHTML = template;

        newArticle.querySelector('button').addEventListener('click', () => {
            this.boundSaveArticleToReadLater(this.state);
        });
        return newArticle;
    }
}
