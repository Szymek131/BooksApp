{
  'use strict';

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };


  class BooksList {

    constructor(id){
      const thisBook = this;

      thisBook.id = id;
      thisBook.generateBooks();
      thisBook.initActions();
      thisBook.filterBooks();
      thisBook.determineRatingBgc();
    }


    generateBooks() {
      const thisBook = this;
      const bookWrapper = document.querySelector('.books-list');

      for (let book in dataSource.books){
        const singleBook = dataSource.books[book];
        const ratingBgc = thisBook.determineRatingBgc(book.rating);
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
    }
    filterBooks(filters){

      for(let book of dataSource.books){
        
        const bookId = book.id;
        const bookImage = document.querySelector('.book__image[data-id="'+ bookId +'"]');
  
        for(let filter of filters){
          
          if(book.details[filter] == false && !bookImage.classList.contains('hidden')){
            bookImage.classList.add('hidden');
            console.log(book.details[filter]);
          } else if(book.details[filter] == false && bookImage.classList.contains('hidden')) {
            bookImage.classList.remove('hidden');
          }
        }
      }
    }

    getElements() {
      const thisBook = this;

      this.bookWrapper = document.querySelector('.books-list');
      this.booksList = document.querySelector('.books-list');
      this.filtersWrapper = document.querySelector('.filters');
    }

    initActions(){

      const thisBook = this;
      
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
          thisBook.filterBooks(filters);
          console.log(checkbox.value);
          if(checkbox.checked){
            filters.push(checkbox.value);
            console.log(filters);
  
          } else {
            let index = filters.indexOf(checkbox.value);
            filters.splice(index, 1);
            console.log(filters);
          }
          thisBook.filterBooks(filters);
        }
      });
      console.log(favouriteBooks);
      return filters;
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
      console.log(rating);
    }
  }
  const booksApp = new BooksList();
}