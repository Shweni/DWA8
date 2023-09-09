import{BOOKS_PER_PAGE ,authors,genres,books} from "./data.js"
import {} from "./my-theme/theme.js";
let matches = books;
 let page = 1;
 const range = [0,10];

if (!books|| !Array.isArray(books)) {
 throw new Error('source required');
}
if(!page && page.length< 2){
    throw new Error('Range must be an array with two numbers');
}

export const themeSelect = document.querySelector('[data-settings-theme]');

export const themeMode = {
  day: {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  },
  night: {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  }
}

//const themeSelect = document.querySelector('[data-settings-theme]');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const theme = themeSelect.value;
    document.documentElement.style.setProperty('--color-dark', themeMode[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeMode[theme].light);
  });
 
 // Initialize theme based on user's OS theme preference
 const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
 const initialTheme = prefersDarkMode ? 'night' : 'day';
 document.documentElement.style.setProperty('--color-dark', themeMode[initialTheme].dark);
 document.documentElement.style.setProperty('--color-light', themeMode[initialTheme].light)
 
 

function createPreview(bookData){
    const {author,image, title}= bookData;

    const preview = document.createElement('div');
    preview.classList.add('preview');

    const previewImage= document.createElement('img');
    previewImage.src=image;
    previewImage.alt=title;
    preview.appendChild(previewImage);

    const previewTitle= document.createElement('h2');
    previewTitle.textContent=title;
    preview.appendChild(previewTitle);

    const previewAuthor= document.createElement('p');
    previewAuthor.textContent= authors[author]
    preview.appendChild(previewAuthor);

    return preview;

}

const bookList = document.querySelector('[data-list-items]');
const fragment = document.createDocumentFragment();
let startIndex = 0;
let endIndex = 36;

const extracted = books.slice(startIndex, endIndex);

for (let i = 0; i < extracted.length; i++) {
  const sneakPeak = document.createElement('dl');
  sneakPeak.className = 'preview';
  sneakPeak.dataset.id = books[i].id;
  sneakPeak.dataset.title = books[i].title;
  sneakPeak.dataset.image = books[i].image;
  sneakPeak.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`;
  sneakPeak.dataset.description = books[i].description;
  sneakPeak.dataset.genre = books[i].genres;

  sneakPeak.innerHTML = /*html*/`
    <div>
      <image class='preview__image' src="${books[i].image}" alt="no picture available" />
    </div>
    <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}</dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
    </div>`;

  fragment.appendChild(sneakPeak);
}

bookList.appendChild(fragment);


function createPreviewFragment(data,start,end){
    const fragment=document.createDocumentFragment();

    for( let i= start; i < end && i < data.length;i ++) {

        const {author,image,title,id}=data[i];
        const preview = createPreview({
           author,
           id,
           image,
           title, 
        });
fragment.appendChild(preview);

    }
    return fragment;
}
for(let i = 0; i < extracted.length; i ++){
    const {author,image, title,id}= extracted[i];
    const preview = createPreview({
        author,
        id,
        image,
        title,
    });

    fragment.appendChild(preview);
}

document.querySelector('[data-list-items]').appendChild(fragment);

const genresFragment = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genresFragment.appendChild(element);

for (const [id, name] of Object.entries(genres)) {
  element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  genresFragment.appendChild(element);
}

document.querySelector('[data-search-genres]').appendChild(genresFragment);

const authorsFragment = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorsFragment.appendChild(element);

for (const [id, name] of Object.entries(authors)) {
  element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  authorsFragment.appendChild(element);
}

const selectAuthor = document.querySelector("[data-search-authors]");
Object.keys(authors).forEach((authorId) => {
  const element = document.createElement('option');
  element.value = authorId;
  element.textContent = authors[authorId];
  selectAuthor.appendChild(element);
});

const form = document.getElementById('settings');


document.querySelector('[data-list-button]').textContent = `Show more (${Math.max(0, matches.length - page * BOOKS_PER_PAGE)})`;

document.querySelector('[data-list-button]').disabled === !(matches.length - page * BOOKS_PER_PAGE > 0);

document.querySelector('[data-list-button]').innerHTML = `
  <span>Show more</span>
  <span class="list__remaining">(${Math.max(0, matches.length - page * BOOKS_PER_PAGE)})</span>
`;

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  if (!document.querySelector('[data-search-overlay]').showModal()) {

  }
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
  if (!document.querySelector('[data-settings-overlay]').showModal().open()) {
    
  }
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  
});

document.querySelector('[data-list-close]').addEventListener('click', () => {
  if (!document.querySelector('[data-list-active]').showModal().open()) {
    
  }
});

document.querySelector('[data-list-button]').addEventListener('click', () => {
  const start = page * BOOKS_PER_PAGE;
  const end = (page + 1) * BOOKS_PER_PAGE;
  const fragment = createPreviewFragment(matches, start, end);
  document.querySelector('[data-list-items]').appendChild(fragment);
  document.querySelector('[data-list-button]').textContent = `Show more (${Math.max(0, matches.length - (page + 1) * BOOKS_PER_PAGE)})`;
  document.querySelector('[data-list-button]').disabled = !(matches.length - (page + 1) * BOOKS_PER_PAGE > 0);
  page++;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
  if (document.querySelector('[data-search-overlay]').showModal()) {
    document.querySelector('[data-search-title]').focus();
  }
});

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').close();
   });


document.querySelector('[data-header-settings]').addEventListener('click', () => {
    if (document.querySelector('[data-settings-overlay]').showModal()) {
      document.querySelector('[data-settings-theme]').focus();
    }
  });

  document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').close();
   });





document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch = filters.author === 'any' || book.author === filters.author;
    let genreMatch = false;

    if (filters.genre === 'any') {
      genreMatch = true;
    } else {
      for (const genre of book.genres) {
        if (genre === filters.genre) {
          genreMatch = true;
          break;
        }
      }
    }

    if (titleMatch && authorMatch && genreMatch) {
      result.push(book);
    }
  }

  if (result.length < 1) {
    document.querySelector('[data-list-message]').classList.add('list__message');
  } else {
    document.querySelector('[data-list-message]').classList.remove('list__message');
  }

  document.querySelector('[data-list-items]').innerHTML = '';
  const fragment = createPreviewFragment(result, range[0], range[1]);
  document.querySelector('[data-list-items]').appendChild(fragment);
  const initial = Math.max(0, result.length - page * BOOKS_PER_PAGE);
  const remaining = result.length > page * BOOKS_PER_PAGE ? initial : 0;

  document.querySelector('[data-list-button]').disabled = initial > 0;

  document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">(${remaining})</span>
  `;

  window.scrollTo(0, 0);
  document.querySelector('[data-search-overlay]').open() = false;
});



document.querySelector('[data-list-items]').addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    const previewId = node?.dataset?.preview;

    for (const singleBook of books) {
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }

    if (active) {
      break;
    }
  }

  if (!active) {
    return;
  }

  document.querySelector('[data-list-active]').showModal();
document.querySelector('[data-list-blur]').src = active.image;
document.querySelector('[data-list-title]').textContent = active.title;
document.querySelector('[data-list-subtitle]').textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
document.querySelector('[data-list-description]').textContent = active.description;

});


