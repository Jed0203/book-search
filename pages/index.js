// pages/index.js

import { useState } from 'react';
import axios from 'axios';
import BookResult from './components/BookResult';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await axios.get(`http://openlibrary.org/search.json?q=${query}`);
      setResults(response.data.docs);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchBooks();
  };

  const filteredResults = results.filter(book => {
    const title = book.title.toLowerCase();
    const author = book.author_name ? book.author_name.join(',').toLowerCase() : '';
    return title.includes(query.toLowerCase()) || author.includes(query.toLowerCase());
  });

  return (
    <div className="flex flex-col md:px-12 px-4 bg-black font-poppins items-center min-h-screen">
      <h1 className="md:text-6xl text-4xl font-bold text-primary mt-10">
        <span className="text-blue-500">Books</span> <span className="text-white">Search</span>
      </h1>
      <form onSubmit={handleSubmit} className="mt-8 flex justify-center">
        <input type="text" value={query} onChange={handleChange} className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Search</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {filteredResults.map((book, index) => (
          <div key={index} className="bg-white rounded-lg p-4">
            <BookResult book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

