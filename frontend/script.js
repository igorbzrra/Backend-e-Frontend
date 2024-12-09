//const API_URL = 'http://localhost:8080/books';

document.getElementById('add-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, isbn }),
        });
        if (response.ok) {
            const book = await response.json();
            alert(`Book added: ID ${book.id}`);
        } else {
            alert('Error adding book!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('list-books').addEventListener('click', async () => {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();
        document.getElementById('results').innerHTML = `
            <h3>Book List</h3>
            <ul>${books.map(book => `<li>${book.id}: ${book.title} (${book.isbn})</li>`).join('')}</ul>
        `;
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('get-by-id').addEventListener('click', async () => {
    const id = document.getElementById('id-query').value;
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const book = await response.json();
        document.getElementById('results').innerHTML = `
            <h3>Book Found</h3>
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>ISBN: ${book.isbn}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
    }
});