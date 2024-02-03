const BookDetail = ({ book, onClose }) => {
  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p className="text-gray-700">{book.description}</p>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Close</button>
    </div>
  );
};

export default BookDetail;