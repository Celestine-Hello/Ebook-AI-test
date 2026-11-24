const books = {
  garden: {
    title: 'The Quiet Garden', author: 'Mira Sol', file: 'books/quiet-garden.pdf',
    pages: [
      { heading: 'The Quiet Garden', byline: 'A short story by Mira Sol', paragraphs: ['On Maple Street, between a bakery and a shop that sold old maps, there was a patch of ground no wider than a bedsheet. For years it held a tired bench, two stubborn weeds, and a sign that said PLEASE KEEP OFF THE GRASS. There was no grass.'] },
      { heading: 'A small beginning', paragraphs: ['Mira passed it every morning on her way to the bus. One rainy Tuesday she noticed a paper cup full of soil beside the bench. A green tip leaned out of it. The next day she brought a spoon. The day after that, she brought a packet of marigold seeds.', 'She asked the neighbors before she planted anything. Mr. Lee from the bakery offered a bucket. Jo, who lived upstairs, brought gloves with one blue thumb. A child named Remy painted a wooden sign: PLEASE HELP THE GRASS GROW.'] },
      { heading: 'Room to grow', paragraphs: ['By June, yellow flowers nodded beside the bench. People who had only traded hurried nods began to stop. They learned names, shared mint tea, and took turns watering before breakfast.', 'One evening Mira found the old sign again. Someone had crossed out KEEP OFF and written TAKE CARE. The garden felt less like a place she had made and more like a place that had made room for everyone.'] },
    ],
  },
  signals: {
    title: 'Signals from the Sky', author: 'Jonah Vale', file: 'books/signals-from-the-sky.pdf',
    pages: [
      { heading: 'Signals from the Sky', byline: 'Field notes by Jonah Vale', paragraphs: ['Looking up is a way of practicing attention. The night sky changes slowly enough to invite patience, but quickly enough to reward a second look. You do not need special equipment to begin. Your eyes, a notebook, and a safe place to stand are plenty.'] },
      { heading: 'Start with a question', paragraphs: ['Find a familiar building or tree and notice what is above it. A bright point that stays still may be a planet or a star. A steady line of lights moving together is often an airplane. Write down what you saw before deciding what it was.', 'Keep a simple log: date, time, place, weather, direction, and a few words about the view. A sketch can be more useful than a perfect description. Add question marks freely. Good field notes preserve uncertainty instead of hiding it.'] },
      { heading: 'Return and notice', paragraphs: ['The Moon is an easy first companion. Watch its shape and where it rises over several evenings. Constellations are patterns people have connected across the sky; they help us find our way, even though their stars can be very far apart.', 'Observation is more fun when it is shared. Compare notes with someone else. The differences may reveal how much there is to notice, and how carefully a question can be asked.'] },
    ],
  },
};

const id = new URLSearchParams(location.search).get('id');
const book = books[id];
let currentPage = 0;
let zoom = 1;
const spread = document.querySelector('#book-spread');
const leftPage = document.querySelector('#left-page');
const rightPage = document.querySelector('#right-page');
const pageCounter = document.querySelector('#page-counter');
const prevButtons = [document.querySelector('#page-prev'), document.querySelector('#control-prev')];
const nextButtons = [document.querySelector('#page-next'), document.querySelector('#control-next')];

function renderPage(target, page, number) {
  if (!page) { target.className = 'book-page blank-page'; target.innerHTML = '<span class="page-mark">Little Library</span>'; return; }
  target.className = `book-page ${target.id === 'left-page' ? 'left-page' : 'right-page'}`;
  target.innerHTML = `${page.heading ? `<h1>${page.heading}</h1>` : ''}${page.byline ? `<p class="page-byline">${page.byline}</p>` : ''}${page.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}<span class="page-number">${number}</span>`;
}
function renderSpread() {
  const leftNumber = currentPage + 1;
  const rightNumber = currentPage + 2;
  renderPage(leftPage, book.pages[currentPage], leftNumber);
  renderPage(rightPage, book.pages[currentPage + 1], rightNumber);
  pageCounter.textContent = `${leftNumber}–${Math.min(rightNumber, book.pages.length)} / ${book.pages.length}`;
  prevButtons.forEach((button) => button.disabled = currentPage === 0);
  nextButtons.forEach((button) => button.disabled = currentPage + 2 >= book.pages.length);
  document.querySelector('#page-overview').innerHTML = book.pages.map((page, index) => `<button type="button" data-page="${index}" class="overview-page"><span>${index + 1}</span><strong>${page.heading || book.title}</strong></button>`).join('');
  document.querySelectorAll('.overview-page').forEach((button) => button.addEventListener('click', () => { currentPage = Math.floor(Number(button.dataset.page) / 2) * 2; renderSpread(); document.querySelector('#page-overview').hidden = true; }));
}

if (book) {
  document.title = `${book.title} — Little Library`;
  document.querySelector('#book-title').textContent = book.title;
  document.querySelector('#download-link').href = book.file;
  renderSpread();
} else {
  document.querySelector('#book-title').textContent = 'Book not found';
  leftPage.innerHTML = '<h1>Book not found</h1><p>Return to the library and choose a title from the shelf.</p>';
  rightPage.hidden = true;
}

function go(direction) {
  if (!book) return;
  currentPage = Math.max(0, Math.min(book.pages.length - 1, currentPage + direction * 2));
  renderSpread();
  spread.classList.remove('turn-next', 'turn-prev');
  void spread.offsetWidth;
  spread.classList.add(direction > 0 ? 'turn-next' : 'turn-prev');
}
prevButtons.forEach((button) => button.addEventListener('click', () => go(-1)));
nextButtons.forEach((button) => button.addEventListener('click', () => go(1)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') go(-1);
  if (event.key === 'ArrowRight') go(1);
});
document.querySelector('#grid-toggle').addEventListener('click', () => { const overview = document.querySelector('#page-overview'); overview.hidden = !overview.hidden; });
document.querySelector('#zoom-in').addEventListener('click', () => { zoom = Math.min(1.18, zoom + 0.06); spread.style.setProperty('--book-zoom', zoom); });
document.querySelector('#zoom-out').addEventListener('click', () => { zoom = Math.max(0.82, zoom - 0.06); spread.style.setProperty('--book-zoom', zoom); });
document.querySelector('#fullscreen-toggle').addEventListener('click', () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); });

const toggle = document.querySelector('#ai-toggle');
const drawer = document.querySelector('#ai-drawer');
const backdrop = document.querySelector('#drawer-backdrop');
const message = document.querySelector('#tool-message');
function setDrawer(open) {
  toggle.setAttribute('aria-expanded', String(open)); drawer.setAttribute('aria-hidden', String(!open)); drawer.inert = !open;
  drawer.classList.toggle('is-open', open); backdrop.hidden = !open; document.body.classList.toggle('drawer-open', open);
  if (open) document.querySelector('#ai-close').focus(); else toggle.focus();
}
toggle.addEventListener('click', () => setDrawer(toggle.getAttribute('aria-expanded') !== 'true'));
document.querySelector('#ai-close').addEventListener('click', () => setDrawer(false));
backdrop.addEventListener('click', () => setDrawer(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setDrawer(false); });
document.querySelectorAll('.tool-item').forEach((button) => button.addEventListener('click', () => {
  const names = { summary: 'Book summaries', speech: 'Read aloud', quiz: 'Book quizzes' };
  message.querySelector('span:last-child').textContent = `${names[button.dataset.tool]} will be available when Gemini is connected.`;
}));
