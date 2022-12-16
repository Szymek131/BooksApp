{
  'use strict';

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };

  const generateBooks = function(){
    
    const bookWrapper = document.querySelector('.books-list');

    for (let book in dataSource.books){
      const singleBook = dataSource.books[book];
      console.log(singleBook);
      let generatedHTML = templates.bookTemplate(singleBook);
      console.log(generatedHTML);
      let generatedDOM = utils.createDOMFromHTML(generatedHTML);
      console.log(generatedDOM);
      bookWrapper.appendChild(generatedDOM);
    }
  };

  const initActions  = function(){

    const bookLink = document.querySelectorAll('.book__image');
    console.log(bookLink);
    let favouriteBooks = [];
    for (let link of bookLink){

      link.addEventListener('dblclick', function(){
         
        link.classList.add('favorite');
        favouriteBooks.push(link);
        console.log(favouriteBooks);

        if(favouriteBooks.includes(link)){
          link.addEventListener('dblclick', function(){
          
            link.classList.toggle('favorite');
            let index = favouriteBooks.lastIndexOf(link);
            favouriteBooks.splice(index, 1);
            console.log(favouriteBooks);
          });
        }
      });
    }
  };

  generateBooks();
  initActions();
}