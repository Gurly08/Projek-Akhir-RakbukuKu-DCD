document.addEventListener("DOMContentLoaded", function () {
    const BOOKS_KEY = "bookshelf";
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const yearInput = document.getElementById("year");
    const isComplateInput = document.getElementById("isComplate");
    const tambahBuku = document.getElementById("add-book");
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("searchbtn");
    const completed = document.getElementById("completed");
    const uncompleted = document.getElementById("uncompleted");

    // Save books to Local Storage
    function saveBooksToLocalStorage(books) {
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }

    // Load books from Local Storage
    function loadBooksFromLocalStorage() {
        const booksData = localStorage.getItem(BOOKS_KEY);
        return booksData ? JSON.parse(booksData) : [];
    }

    // Update the bookshelf UI
    function updateRakBukuKu() {
        const books = loadBooksFromLocalStorage();
        completed.innerHTML = "";
        uncompleted.innerHTML = "";

        books.forEach((book) => {
            const listbookItem = document.createElement("li");
            listbookItem.innerHTML = `
            <div>
                <p>title Buku: ${book.title}</p>
                <p>author Buku: ${book.author}</p>
                <p>year Terbit: ${book.year}</p>
            </div>
            <div>
                <button class="move-button">${book.isComplate ? "Belum Dibaca" : "Sudah Selesai Dibaca"
                }</button>
                <button class="delete-button">Hapus</button>
            </div>
            `;

            const moveButton = listbookItem.querySelector(".move-button");
            moveButton.addEventListener("click", () => {
                book.isComplate = !book.isComplate;
                saveBooksToLocalStorage(books);
                updateRakBukuKu();
            });

            const deleteButton = listbookItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                const bookIndex = books.findIndex((b) => b.id === book.id);
                if (bookIndex !== -1) {
                    books.splice(bookIndex, 1);
                    saveBooksToLocalStorage(books);
                    updateRakBukuKu();
                }
            });

            if (book.isComplate) {
                completed.appendChild(listbookItem);
            } else {
                uncompleted.appendChild(listbookItem);
            }
        });
    }

    tambahBuku.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const author = authorInput.value;
        const year = parseInt(yearInput.value);
        const isComplate = isComplateInput.checked;

        if (title && author && year) {
            const books = loadBooksFromLocalStorage();
            const newBook = {
                id: +new Date(),
                title,
                author,
                year,
                isComplate,
            };

            books.push(newBook);
            saveBooksToLocalStorage(books);

            titleInput.value = '';
            authorInput.value = '';
            yearInput.value = '';
            isComplateInput.checked = false;

            updateRakBukuKu();
        }
    });

    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const books = loadBooksFromLocalStorage();
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.year.toString().includes(searchTerm)
      );
  
      updateRakBukuKuWithSearch(filteredBooks);
    });
  
    function updateRakBukuKuWithSearch(books) {
      const searchTerm = searchInput.value.toLowerCase();
      completed.innerHTML = "";
      uncompleted.innerHTML = "";
  
      books.forEach((book) => {
        const { title, author, year } = book;
        const lowercaseTitle = title.toLowerCase();
        const lowercaseAuthor = author.toLowerCase();
        const yearString = year.toString();
  
        if (
          lowercaseTitle.includes(searchTerm) ||
          lowercaseAuthor.includes(searchTerm) ||
          yearString.includes(searchTerm)
        ) {
          const listbookItem = document.createElement("li");
          listbookItem.innerHTML = `
            <div>
              <p>Judul Buku: ${book.title}</p>
              <p>Penulis Buku: ${book.author}</p>
              <p>Tahun Terbit: ${book.year}</p>
            </div>
            <div>
              <button class="move-button">${
                book.isComplete ? "Selesai Dibaca" : "Sudah Selesai Dibaca"
              }</button>
              <button class="delete-button">Hapus</button>
            </div>
          `;
  
          const moveButton = listbookItem.querySelector(".move-button");
          moveButton.addEventListener("click", () => {
            book.isComplete = !book.isComplete;
            saveBooksToLocalStorage(books);
            updateRakBukuKu();
          });
  
          const deleteButton = listbookItem.querySelector(".delete-button");
          deleteButton.addEventListener("click", () => {
            const bookIndex = books.findIndex((b) => b.id === book.id);
            if (bookIndex !== -1) {
              books.splice(bookIndex, 1);
              saveBooksToLocalStorage(books);
              updateRakBukuKuWithSearch(books);
            }
          });
  
          if (book.isComplete) {
            completed.appendChild(listbookItem);
          } else {
            uncompleted.appendChild(listbookItem);
          }
        }
      });
    }
    
      updateRakBukuKu();
    });