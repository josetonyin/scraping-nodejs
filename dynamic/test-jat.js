const Nightmare = require('nightmare')

const URL_BLOG = 'https://www.packtpub.com/books/content/blogs';
const SELECTOR_SORT = '.selectBox.solr-page-sort-selector-select.selectBox-dropdown';
const SELECTOR_SORT_OPTION = '.solr-page-sort-selector-select-selectBox-dropdown-menu > li > a[rel="ds_blog_release_date desc"]';
const SELECTOR_VIEW = '.solr-page-rows-selector-option[data-rows="48"]';

// Viewport must have a width at least 1040 for the desktop version of Packt's blog
const nightmare = new Nightmare({ show: true }).viewport(1041, 800);

(async() => {
  await nightmare
    .goto(URL_BLOG)
    .wait(SELECTOR_SORT) // Always good to wait before performing an action on an element
    .mousedown(SELECTOR_SORT)
    .wait(SELECTOR_SORT_OPTION)
    .mousedown(SELECTOR_SORT_OPTION) // Drop down menu doesn't listen for `click` events like normal...
    .mouseup(SELECTOR_SORT_OPTION)
    .wait(SELECTOR_VIEW)
    .click(SELECTOR_VIEW)
    .evaluate(
      () => {
        let posts = [];
        document.querySelectorAll('.packt-article-line-view').forEach(
          post => {
            posts = posts.concat({
              image: post.querySelector('img').src,
              title: post.querySelector('.packt-article-line-view-title').textContent.trim(),
              link: post.querySelector('a').href,
              description: post.querySelector('p').textContent.trim(),
            });
          }
        );
        return posts;
      }
    )
    .end()
    .then(
      result => console.log(result)
    );
})();