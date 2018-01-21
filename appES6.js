// Versione ES6
// Costruttore Libri
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Costruttore
class UI {
  addBookToList(book) {
   
      const list = document.getElementById('book-list');
      // Crea un elemento tr
      const row = document.createElement('tr');
      // Inserisci colonne
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      `;

      list.appendChild(row);
  }


  showAlert(message, className) {
       // Crea un div
       const div = document.createElement('div');
       // Aggiungi classe
       div.className = `alert ${className}`;
       // Aggiungi testo
       div.appendChild(document.createTextNode(message));
       // Ottieni il parent
       const container = document.querySelector('.container');
       // Ottieni il form
       const form = document.querySelector('#book-form');
       // Aggiungi il messaggio prima del form sotto h1
       container.insertBefore(div, form);
       // Eliminazione del messaggio dopo 3 secondi
       setTimeout(function(){
         document.querySelector('.alert').remove();
 
       }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    }
  }

  // Classe per il Local Storage
  class Store {

    static getBooks() {
      let books;

    if(localStorage.getItem('books') === null){
      books = [];
      } else {
      books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }


    static displayBooks() {
      const books = Store.getBooks();

      books.forEach(function(book){
        const ui = new UI;

        // Aggiungi libro a UI
        ui.addBookToList(book);
      });
    }

    static addBook(book) {
      const books = Store.getBooks();

      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
      const books = Store.getBooks();

      books.forEach(function(book, index){
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });

      localStorage.setItem('books', JSON.stringify(books));
    }
  }


// Caricamento Eventi del DOM
document.addEventListener('DOMContentLoaded', Store.displayBooks);



// Metodo Eventi SUBMIT e aggiunta libri
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Ottieni i valori dal form
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  

    // Instanzia Book
      const book = new Book(title, author, isbn);

      // Instanzia UI
      const ui = new UI(); 

      // Validazione
      if(title === '' || author === '' || isbn === '') {
        // Messaggio di errore
        ui.showAlert('Si prega di riempire tutti i campi', 'error');
      } else {
      // aggiungi i libri alla lista
        ui.addBookToList(book);

        // Aggiunge al local storage
        Store.addBook(book);

        // Mostra il corretto inserimento del libro
        ui.showAlert('Libro aggiunto !', 'success');

      // Cancella campi
        ui.clearFields();
      }      

        e.preventDefault();
});

// Metodo Eventi DELETE e rimozione libri
  document.getElementById('book-list').addEventListener('click', function (e) {
    
    // Instanzia UI
    const ui = new UI();

    // Cancella libro
    ui.deleteBook(e.target);

    // Rimuovi dal Local Storage(il target punta all'elemento isbn)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    // Mostra messaggio
    ui.showAlert('Libro rimosso !', 'success');
    
    e.preventDefault();
  });

