export default class Article {
    constructor(header, sectionName, publicationDate, url, id, application) {
        this.state = {
            header,
            sectionName,
            publicationDate,
            url,
            id,
        };
        this.application = application;
        this.htmlElement = this.render();
    }

    saveArticleToReadLater(article) {
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
        if (!savedArticles.find((item) => item.id === article.id))
            localStorage.setItem(
                'savedArticles',
                JSON.stringify(savedArticles ? [...savedArticles, article] : [article])
            );
        this.application.getReadlaterArticlesList();
    }

    render() {
        const { header, sectionName, publicationDate, url } = this.state;
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
            <button class="button button-outline">Read Later</button>
        </section>
        </article>
    `;

        const newArticle = document.createElement('li');
        newArticle.innerHTML = template;
        newArticle.querySelector('button').addEventListener('click', () => {
            this.saveArticleToReadLater(this.state);
        });
        return newArticle;
    }
}
