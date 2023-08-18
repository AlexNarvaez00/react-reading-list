import { BooksContainer } from "./contexts/BooksContext";
import Index from "./pages";
import viteLogo from "/vite.svg";

function App() {
  return (
    <BooksContainer>
      <main>
        <section>
          <div className="container mx-auto py-11">
            <Index />
          </div>
        </section>
      </main>
    </BooksContainer>
  );
}

export default App;
