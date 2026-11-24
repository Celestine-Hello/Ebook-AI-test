const books = [
  { id: 'garden', title: 'The Quiet Garden', author: 'Mira Sol', genre: 'A short story · 3 pages', file: 'books/quiet-garden.pdf', initial: 'Q', cover: 'green', description: 'A gentle story about a city gardener who discovers that tending a small patch of earth can change the way an entire neighborhood sees itself.' },
  { id: 'signals', title: 'Signals from the Sky', author: 'Jonah Vale', genre: 'Field notes · 3 pages', file: 'books/signals-from-the-sky.pdf', initial: 'S', cover: 'blue', description: 'A beginner-friendly set of field notes about observing the night sky, asking good questions, and keeping a patient record of what you notice.' },
];

const list = document.querySelector('#book-list');
books.forEach((book) => {
  const link = document.createElement('a');
  link.className = 'book-card';
  link.href = `book.html?id=${encodeURIComponent(book.id)}`;
  link.setAttribute('aria-label', `Open ${book.title} by ${book.author}`);
  link.innerHTML = `<span class="cover ${book.cover}" aria-hidden="true">${book.initial}</span><span class="book-info"><strong>${book.title}</strong><span>by ${book.author}</span><small>${book.genre}</small></span><span class="card-arrow" aria-hidden="true">↗</span>`;
  list.append(link);
});
document.querySelector('#book-count').textContent = `${books.length} books in the collection`;
