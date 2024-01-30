// components/BookResult.js

const BookResult = ({ book }) => {
    const { title, author_name, first_publish_year, cover_i } = book;
  
    return (
      <div className="book-result">
        <div className="book-cover">
        <img src={`http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} alt={title} />
      </div>
        <div className="book-details">
          <h3>{title}</h3>
          <p>Author: {author_name}</p>
          <p>Year: {first_publish_year}</p>
        </div>
      </div>
    );
  };
  
  export default BookResult;
  