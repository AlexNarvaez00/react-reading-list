import { createContext, useEffect, useState } from "react";
import {
  getAllGenres,
  getBooksByPagesAndGenreOrTitle,
  updateReadingLisStore,
} from "../sevices/booksService";

const observerStore = (setReadingList) => {
  const readStore = () => {
    const readingList = window.localStorage.getItem("readingList") ?? "[]";
    setReadingList(JSON.parse(readingList));
  };
  window.addEventListener("storage", readStore);
  readStore();
  return () => {
    window.removeEventListener("storage", readStore);
  };
};

export const BooksContext = createContext();

export function BooksContainer({ children }) {
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState(2000);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [readingList, setReadingList] = useState([]);

  const [genres, setGenres] = useState();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsuscribe = observerStore(setReadingList);
    setIsLoading(true);
    getAllGenres().then((res) => setGenres(res));
    getBooksByPagesAndGenreOrTitle(pages, genre, title).then((res) => {
      setBooks(res);
      setIsLoading(false);
    });
    return () => {
      unsuscribe();
    };
  }, [genre, pages, title]);

  const toggleReadingList = (ISBN) => {
    const bookFinded = books.find((book) => book.ISBN == ISBN);
    updateReadingLisStore(ISBN, bookFinded);
    const readingList = window.localStorage.getItem("readingList") ?? "[]";
    setReadingList(JSON.parse(readingList));
  };

  const existInReadingList = (ISBN) => {
    return readingList.find((book) => book.ISBN == ISBN);
  };

  return (
    <BooksContext.Provider
      value={{
        genres,
        books,
        setGenre,
        pages,
        setPages,
        isLoading,
        toggleReadingList,
        existInReadingList,
        readingList,
        setTitle,
        title
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
