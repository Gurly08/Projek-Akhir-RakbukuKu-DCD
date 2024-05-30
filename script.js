document.addEventListener("DOMContentLoaded", function () {
    const BOOKS_KEY = "rakbukuku";
    const judulInput = document.getElementById("judul");
    const penulisInput = document.getElementById("penulis");
    const tahunInput = document.getElementById("tahun");
    const Checkbox = document.getElementById("checkbox");
    const tambahBuku = document.getElementById("tambahbuku");
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("searchbtn")
    const complated = document.getElementById("complated");
    const uncomplated = document.getElementById("uncomplated");

    //pembuatan kondisi penyimpanan kedalam LS
    function saveBooksToLocalStorage(books) {
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }

    //pembuatan kondisi pengambilan data dari LS
    function loadBooksFromLocalStorage() {
        const booksData = localStorage.getItem(BOOKS_KEY);
        return booksData ? JSON.parse(booksData) : [];
    }

    //pembuatan kondisi update penyimpanan LS
    function updateRakBukuKu() {
        const books = loadBooksFromLocalStorage();
        complated.innerHTML = "";
        uncomplated.innerHTML = "";

        books.forEach((book) => {
            const listbookItem = document.createElement("li");
            listbookItem.innerHTML = `
            <div>
                <p>Judul Buku: ${book.judul}</p>
                <p>Penulis Buku: ${book.penulis}</p>
                <p>Tahun Terbit: ${book.tahun}</p>
            </div>
            <div>
                <button class="move-button">${book.checkbox ? "Selesai Dibaca" : "Belum Selesai Dibaca"//perubahan1
                }</button>
                <button class="delete-button">Hapus</button>
            </div>
            `;

            const moveButton = listbookItem.querySelector(".move-button");
            moveButton.addEventListener("click", () => {
                book.checkbox = !book.checkbox;
                saveBooksToLocalStorage(books)
                updateRakBukuKu();
            });

            const delateButton = listbookItem.querySelector('.delate-button');
            delateButton.addEventListener('click', () => {
                const bookIndex = books.findIndex((b) => b.id === book.id);
                if (bookIndex) {
                    books.splice(bookIndex, 1);
                    saveBooksToLocalStorage();
                    updateRakBukuKu();
                }
            });

            if (book.checkbox) {
                complated.appendChild(listbookItem);
            } else {
                uncomplated.appendChild(listbookItem);
            }
        });
    }

    tambahBuku.addEventListener('click', () => {
        const judul = judulInput.value;
        const penulis = penulisInput.value;
        const tahun = presentInt(tahunInput.value);
        const checkbox = Checkbox.checked;

        if (judul && penulis && tahun) {
            const books = loadBooksFromLocalStorage();
            const newBook = {
                id: +new Date(),
                judul,
                penulis,
                tahun,
                checkbox,
            };

            books.push(newBook);
            saveBooksToLocalStorage(books);

            judulInput.value = '';
            penulisInput.value = '';
            tahunInput.value = '';
            Checkbox.checked = false;

            updateRakBukuKu();
        }
    });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const books = loadBooksFromLocalStorage();
        const filterreadBooks = books.filter(
            (book) =>
                book.judul.toLowerCase().includes(searchTerm) ||
                book.penulis.toLowerCase().includes(searchTerm) ||
                book.tahun.toSting().includes(searchTerm)
        );

        updateRakBukuKuWithSearch(filterreadBooks);
    });

    //Pembuatan kondisi updating penyimpanan rakbukuku
    function updateRakBukuKuWithSearch(books) {
        const searchTerm = searchInput.value.toLowerCase();
        complated.innerHTML = '';
        uncomplated.innerHTML = '';

        books.forEach((book) => {
            const { judul, penulis, tahun } = book;
            const lowercaseJudul = judul.toLowerCase();
            const lowercasePenulis = penulis.toLowerCase();
            const tahunString = tahun.toSting();

            if (
                lowercaseJudul.includes(searchTerm) ||
                lowercasePenulis.includes(searchTerm) ||
                tahunString.includes(searchTerm)
            ) {
                const listbookItem = document.createElement('li');
                listbookItem.innerHTML = `
                    <div>
                        <p>Judul Buku: ${book.judul}</p>
                        <p>Penulis Buku: ${book.penulis}</p>
                        <p>Tahun Terbit: ${book.tahun}</p>
                    </div>
                    <div>
                        <button class="move-button">${book.checkbox ? "Selesai Dibaca" : "Belum Selesai Dibaca"
                    }</button>
                        <button class="delete-button">Hapus</button>
                    </div>
                `;

                const moveButton = listbookItem.querySelector(".move-button");
                moveButton.addEventListener("click", () => {
                    book.checkbox = !book.checkbox;
                    saveBooksToLocalStorage(books)
                    updateRakBukuKu();
                });

                const delateButton = listbookItem.querySelector('.delate-button');
                delateButton.addEventListener('click', () => {
                    const bookIndex = books.findIndex((b) => b.id === book.id);
                    if (bookIndex) {
                        books.splice(bookIndex, 1);
                        saveBooksToLocalStorage();
                        updateRakBukuKu();
                    }
                });

                if (book.checkbox) {
                    complated.appendChild(listbookItem);
                } else {
                    uncomplated.appendChild(listbookItem);
                }
            }
        });
    }

    updateRakBukuKu();
});