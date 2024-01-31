import { useState } from 'react';
import axios from 'axios';
import BookResult from './components/BookResult';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

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
  
      {/* Slideshow */}
      <div className="max-w-[1400px] w-full py-24 px-4 relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className='w-full h-96 rounded-2xl bg-center bg-cover duration-500'
        ></div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='text-2xl cursor-pointer white-dot'
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
  
      <h1 className="md:text-6xl text-4xl font-bold mt-0.5">
        <span className="text-blue-500">Books</span> <span className="text-white">Search</span>
      </h1>
  
      <form onSubmit={handleSubmit} className="mt-8 flex justify-center">
        <input type="text" value={query} onChange={handleChange} placeholder='Enter book title' className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
        <button type="submit" className="ml-2 px-4 py-2 bg-white text-black rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500">Search</button>
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
