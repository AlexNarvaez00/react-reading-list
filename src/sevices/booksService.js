import { library } from "../mocks/books.json";

const books = library.map((book) => book.book);

export async function getBooksByPagesAndGenreOrTitle(pages, gener, title) {
  return books.filter((book) => {
    return (
      book.pages <= pages &&
      (book.genre == gener || gener == "") &&
      (book.title.toLowerCase().includes(title.toLowerCase()) || title == "")
    );
  });
}

export async function getAllGenres() {
  return [...new Set(books.map((book) => book.genre))];
}

export function updateReadingLisStore(ISBN, bookFinded) {
  const readingListJSON = window.localStorage.getItem("readingList") ?? "[]";
  const readingList = JSON.parse(readingListJSON);
  const book = readingList.find((book) => {
    return book.ISBN == ISBN;
  });
  if (book == undefined) {
    window.localStorage.setItem(
      "readingList",
      JSON.stringify([...readingList, bookFinded]),
    );
  } else {
    const newBooks = readingList.filter((item) => {
      return item.ISBN != ISBN;
    });
    window.localStorage.setItem("readingList", JSON.stringify(newBooks));
  }
}
