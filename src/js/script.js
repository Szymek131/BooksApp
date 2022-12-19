{
  'use strict';

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };


  const generateBooks = function(){

    const bookWrapper = document.querySelector('.books-list');

    for (let book in dataSource.books){
      const singleBook = dataSource.books[book];
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      console.log(ratingBgc);
      console.log(ratingWidth);
      console.log(singleBook);
      let generatedHTML = templates.bookTemplate(singleBook);
      console.log(generatedHTML);
      let generatedDOM = utils.createDOMFromHTML(generatedHTML);
      console.log(generatedDOM);
      bookWrapper.appendChild(generatedDOM);
    }
  };

  const filterBooks = function(filters){

    let shouldBeHidden = false;
    for(let book in dataSource.books){
      
      for(let filter of filters){
        if(filter)
      }
    }
  };

  const initActions = function(){
    const booksList = document.querySelector('.books-list');
    console.log(booksList);
    let favouriteBooks = [];
    const filters = [];
    const filterWrapper = document.querySelector('.filters');
    console.log(filterWrapper);

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const link = event.target;
      console.log(link);
      link.classList.add('favorite');
      const bookId = link.getAttribute('data-id');
      console.log(bookId);

      if(!favouriteBooks.includes(bookId)){
        link.classList.add('favorite');
        favouriteBooks.push(bookId);
      } else {
        link.classList.remove('favorite');
        let index = favouriteBooks.indexOf(bookId);
        favouriteBooks.splice(index, 1);
      }

    });
    
    filterWrapper.addEventListener('click', function(event){
      const checkbox = event.target;
      console.log(checkbox);
      
      if(checkbox.tagName === 'INPUT' && checkbox.type === 'checkbox' && checkbox.name === 'filter'){
        console.log(checkbox.value);
        if(checkbox.checked){
          filters.push(checkbox.value);
          console.log(filters);

        } else {
          let index = filters.indexOf(checkbox.value);
          filters.splice(index, 1);
          console.log(filters);
        }
      }
    });
    console.log(favouriteBooks);
  };

  const determineRatingBgc = function(rating){
    
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    console.log(rating);
  };

  generateBooks();
  initActions();
}