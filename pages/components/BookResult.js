/**
 * Component representing a single book result.
 * @param {Object} props - Component props.
 * @param {Object} props.book - The book object containing information like title, author, etc.
 * @returns {JSX.Element} - JSX element representing the book result.
 */

const BookResult = ({ book }) => {
   // Destructure book object
  const { title, author_name, first_publish_year, cover_i } = book;

  return (
    <div className="book-result">
      <div className="book-cover">
        {/* Render book cover */}
        <img src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`} alt={title} />
      </div>
      {/* Render book details */}
      <div className="book-details">
        <h3>{title}</h3>
        <p>Author: {author_name}</p>
        <p>Year: {first_publish_year}</p>
      </div>
    </div>
  );
};

export default BookResult;

