export default class Article {
    constructor(header, sectionName, publicationDate, url, id) {
        this.state = {
            header,
            sectionName,
            publicationDate,
            url,
            id,
        };
        this.htmlElement = this.render();

        this.render();
    }

    render() {
        const { header, sectionName, publicationDate, url, id } = this.state;
        const template = `
        <article id="article${id}" class="news">
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
        return newArticle;
    }
}
