export default class ReadLaterArticle {
    constructor(header, url, id, app) {
        this.state = {
            header,
            url,
            id,
        };
        this.app = app;
        this.htmlElement = this.render();
    }

    deleteArticleToReadLater(article) {
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
        localStorage.setItem(
            'savedArticles',
            JSON.stringify(savedArticles.filter((item) => item.id !== article.id))
        );
        this.app.getReadLaterArticlesList();
    }

    render() {
        const { header, url } = this.state;
        const template = `
      <h4 class="readLaterItem-title">${header}</h4>
      <section>
        <a href=${url} class="button button-clear">Read</a>
        <button class="button button-clear">Remove</button>
      </section>
      `;

        const newArticle = document.createElement('li');
        newArticle.innerHTML = template;
        newArticle.querySelector('button').addEventListener('click', () => {
            this.deleteArticleToReadLater(this.state);
        });
        return newArticle;
    }
}
