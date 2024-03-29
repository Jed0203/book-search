import { useState, useEffect} from 'react';
import axios from 'axios';
import BookResult from './components/BookResult';
import BookDetail from './components/BookDetail';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import ReactPaginate from 'react-paginate';


const Home = () => {
  // State variables
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Change to 0-based index
  const [searched, setSearched] = useState(false); // State to track if search button is clicked
  const resultsPerPage = 8;
  const [searchedBooks, setSearchedBooks] = useState([]); // Store searched books
  const [selectedBook, setSelectedBook] = useState(null);


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

  // Functions for slideshow navigation
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

  const fetchBookDetails = async (workId) => {
    try {
      const response = await axios.get(`https://openlibrary.org${workId}.json`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      return null;
    }
  };

  const searchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
      setResults(response.data.docs);
      setCurrentPage(0); // Reset to first page when new search is performed
      setSearched(true); // Set searched to true when search is performed
      setSearchedBooks(response.data.docs); // Store searched books
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const pageCount = Math.ceil(results.length / resultsPerPage);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchBooks();
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };


  const indexOfLastResult = (currentPage + 1) * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchedBooks.slice(indexOfFirstResult, indexOfLastResult);

  // Function to handle pagination visibility
  const handlePaginationVisibility = () => {
    const paginationEl = document.querySelector('.pagination');
    if (paginationEl) {
      if (window.innerWidth <= 768) {
        paginationEl.classList.add('hidden');
      } else {
        paginationEl.classList.remove('hidden');
      }
    }
  };

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      // Call to handle pagination visibility
      handlePaginationVisibility();
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial call to handle pagination visibility
    handlePaginationVisibility();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle selection of a book
  const handleBookSelect = async (book) => {
    const bookDetails = await fetchBookDetails(book.key);

    let descriptionText = "";

    if (typeof bookDetails.description === "object" && bookDetails.description.type === "/type/text") {
      // For the first book with the description format {"type": "/type/text", "value": ...}
      descriptionText = bookDetails.description.value;
    } else if (typeof bookDetails.description === "string") {
      // For the second book with the description format "..."
      descriptionText = bookDetails.description;
    }

    // Create the selected book object with the extracted description
    const selectedBook = {
      title: bookDetails.title,
      description: descriptionText,
      // Add other properties as needed
    };

    setSelectedBook(selectedBook);
  };

  // Function to close the detailed view
  const handleCloseDetailView = () => {
    setSelectedBook(null);
  };


  return (
    <div className="flex flex-col md:px-12 px-4 bg-black font-poppins items-center min-h-screen">
  
      {/* Slideshow */}
      <div className="max-w-[1400px] w-full py-23 px-4 relative group">
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
              className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-white' : 'text-gray-400'}`}
              >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
  
      <h1 className="md:text-6xl text-4xl font-bold mt-0.5">
        <span className="text-blue-500">Books</span> <span className="text-white">Search</span>
      </h1>
      
      {/* Search form */}
      <form onSubmit={handleSubmit} className="mt-8 flex justify-center">
        <input type="text" 
              value={query} onChange={handleChange} placeholder='Enter book title' className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
        <button type="submit" className="ml-2 px-4 py-2 bg-white text-black rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500">Search</button>
      </form>
      
      {/* Render loading animation if loading state is true */}
      {loading && <div className="animate-spin rounded-full h-10 w-10 mt-1 border-t-2 border-b-2 border-blue-500"></div>}
      
      {/* Render search results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {currentResults.map((book, index) => (
          <div key={index} className="bg-slate-400 rounded-lg p-4 hover:transform hover:translate-y-[-5px]" onClick={() => handleBookSelect(book)}>
            <BookResult book={book} onClick={() => handleBookSelect(book)}/>
          </div>
        ))}
      </div>

      {/* Detailed view modal */}
      {selectedBook && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg p-8 z-10">
              <BookDetail book={selectedBook} onClose={handleCloseDetailView} />
            </div>
        </div>
)}


      {/* Pagination */}
      {searched && pageCount > 1 && (
        <div className="mt-8 flex justify-center text-white">
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            previousLabel={currentPage === 0 ? null : 'Previous'}
            nextLabel={currentPage === pageCount - 1 ? null : 'Next'}
            breakLabel={'...'}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName={'pagination-item'}
            previousClassName={'pagination-previous'}
            nextClassName={'pagination-next'}
          />
        </div>
      )}
    </div>
  );
  
};

export default Home;
