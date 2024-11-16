import { useEffect, useState } from "react";
import "./App.css";

const baseUrl = "http://127.0.0.1:8000/api";
function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releseyear, setReleseyear] = useState(0);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`${baseUrl}/book/`);
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      relese_year: releseyear,
    };
    try {
      const response = await fetch(`${baseUrl}/book/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error("Failed to add book");
      }
      const data = await response.json();
      console.log(data);
      fetchBook();
      setTitle("");
      setReleseyear("");
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk, relese_year) => {
    const bookData = {
      title: newTitle,
      relese_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/book/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error("Failed to update title");
      }
      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data;
          } else {
            return book;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (pk) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/book/${pk}/`, {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <h1 className="heading">Book Website</h1>
      <div className="imp">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="first-inp"
          type="text"
          placeholder="Book Name..."
        />
        <input
          value={releseyear}
          onChange={(e) => setReleseyear(e.target.value)}
          className="second-inp"
          type="text"
          placeholder="Release Date..."
        />
        <button onClick={addBook} className="btn">
          Add Book
        </button>
      </div>
      {books.map((book) => (
        <div className="book-details" key={book.id}>
          <h3>
            <span>Title:</span> {book.title}
          </h3>
          <p>
            Release Year: <span>{book.relese_year}</span>
          </p>
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            className="input"
            type="text"
            placeholder="New Title..."
          />
          <button
            onClick={() => updateTitle(book.id, book.relese_year)}
            className="chng-btn"
          >
            Change Title
          </button>
          <button onClick={() => deleteBook(book.id)} className="chng-btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
