'use strict';
{
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };


  class BooksList {

    constructor(id){
      const thisBookList = this;

      thisBookList.id = id;
      thisBookList.generateBooks();
      thisBookList.initActions();
      thisBookList.getElements();
    }


    generateBooks() {
      const thisBookList = this;
      const bookWrapper = document.querySelector('.books-list');

      for (const book of dataSource.books){
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        bookWrapper.appendChild(generatedDOM);
      }
    }

    getElements() {
      const thisBookList = this;

      thisBookList.bookWrapper = document.querySelector('.books-list');
      thisBookList.filtersWrapper = document.querySelector('.filters');
    }

    initActions(){

      const thisBookList = this;
      
      const booksList = document.querySelector('.books-list');
      const favouriteBooks = [];
      const filters = [];
      const filterWrapper = document.querySelector('.filters');
      booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const link = event.target;
        link.classList.add('favorite');
        const bookId = link.getAttribute('data-id');
  
        if(!favouriteBooks.includes(bookId)){
          link.classList.add('favorite');
          favouriteBooks.push(bookId);
        } else {
          link.classList.remove('favorite');
          const index = favouriteBooks.indexOf(bookId);
          favouriteBooks.splice(index, 1);
        }
      });
      
      filterWrapper.addEventListener('click', function(event){
        const checkbox = event.target;
        if(checkbox.tagName === 'INPUT' && checkbox.type === 'checkbox' && checkbox.name === 'filter'){
          thisBookList.filterBooks(filters);
          
          if(checkbox.checked){
            filters.push(checkbox.value);
  
          } else {
            const index = filters.indexOf(checkbox.value);
            filters.splice(index, 1);
          }
          thisBookList.filterBooks(filters);
        }
      });
    }

    filterBooks(filters){

      for(const book of dataSource.books){
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');

        let shouldBeHidden = false;
        for(const filter of filters){
          if(!shouldBeHidden && book.details[filter]){
            shouldBeHidden = true;
          }
        }

        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }
    determineRatingBgc(rating){
    
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  new BooksList();
}