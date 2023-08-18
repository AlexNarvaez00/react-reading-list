import {
  Badge,
  Label,
  RangeSlider,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useContext, useId } from "react";
import { BooksContext } from "../contexts/BooksContext";
import HorizontalCard from "../components/HorizontalCard";

const Index = () => {
  const selectId = useId();
  const rangeId = useId();
  const titleId = useId();

  const {
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
  } = useContext(BooksContext);

  const handleSelect = (event) => {
    setGenre(event.target.value);
  };

  const handleChange = (event) => {
    setPages(event.target.value);
  };
  
  const handleInput = (event) =>{
    setTitle(event.target.value);
  }

  return (
    <>
      <h1 className="text-4xl font-Raleway font-bold text-center text-gray-800 mb-4">
        {books.length} Books
      </h1>
      <section>
        <h2 className="text-3xl font-Raleway font-bold text-center text-gray-800 mb-3">
          {readingList.length} Books in the reading list
        </h2>
      </section>
      <section className="w-full flex justify-between gap-5 px-10 py-5">
        <section>
          <Label htmlFor={titleId} className="font-Raleway">
            Title:
          </Label>
          <TextInput type="text" id={titleId} value={title} onChange={handleInput} />
        </section>

        <section className="flex gap-8">
          <div>
            <Label htmlFor={selectId} className="font-Raleway ">
              Genres
            </Label>
            <Select id={selectId} onChange={handleSelect}>
              <option value={``}>Todos</option>
              {genres?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor={rangeId} className="flex gap-2 font-Raleway">
              Pages <Badge color={`indigo`}>max: {pages}</Badge>
            </Label>
            <RangeSlider
              id={rangeId}
              min={100}
              max={1500}
              value={pages}
              step={100}
              onChange={handleChange}
            />
          </div>
        </section>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 px-10">
        {!isLoading && books.length == 0 && (
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:col-span-3 p-11">
            <h3 className="text-2xl font-Raleway font-bold text-center text-gray-700">
              ¡No hay resultados!
            </h3>
            <p className="font-Raleway  text-center ">
              Intenta cambiar los filtros :)
            </p>
          </div>
        )}

        {isLoading && (
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:col-span-3 flex p-11">
            <div className="mx-auto">
              <Spinner color="info" size="lg" />
            </div>
          </div>
        )}

        {!isLoading &&
          books.length > 0 &&
          books.map((book) => (
            <HorizontalCard
              key={book.ISBN}
              cover={book.cover}
              title={book.title}
              synopsis={book.synopsis}
              toggleReadingList={toggleReadingList}
              ISBN={book.ISBN}
              inReadingList={existInReadingList(book.ISBN)}
              pages={book.pages}
            />
          ))}
      </section>
    </>
  );
};

export default Index;
