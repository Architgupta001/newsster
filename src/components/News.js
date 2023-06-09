import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import { InfinitySpin } from 'react-loader-spinner'
import substitute from "../assets/substitute.jpg"

const News = () => {
    const [news, setNews] = useState([])  
    const [searchNews, setSearchNews] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [isSearching, setIsSearching] = useState(true)
    const [searchQuery, setSearchQuery] = useState('bitcoin')
    const [activeLiCategory, setActiveLiCategory] = useState(null)
    const [activeLiCountry, setActiveLiCountry] = useState(null)
    const [category, setCategory] = useState(()=>{
        //saving it in local storage
        const savedCategory = localStorage.getItem('SelectedCategory');
        if(savedCategory != null){
            return savedCategory;
        }
        return "general";
    })
    const [country, setCountry] = useState(()=>{
        //saving it in local storage
        const savedCountry = localStorage.getItem('SelectedCountry');
        if(savedCountry != null){
            return savedCountry;
        }
        return "in";
    })
    const [isDarkMode, setIsDarkMode] = useState(()=>{
        //saving it in local storage
        const savedMode = localStorage.getItem('darkMode');
        if(savedMode != null){
            return savedMode === 'true';
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    })

    //using useeffect to control api
    useEffect(() => {
      const apiKey = process.env.REACT_APP_API_KEY; 
        
      //It is for our main data
      const getTopHeadlines = async()=>{
        setIsLoading(true);
        const params = {
            country,
            category,
            page,
            apiKey
        };

        const response = await axios.get(
            // real api is only for development use in production it will not work
            // 'https://newsapi.org/v2/top-headlines',

            //Fake news api
            'https://mocki.io/v1/005a7598-0d58-44bf-bac8-80f2661e97d1',
            {params}
        )
        setNews(response.data.articles);
        setIsLoading(false)
      }

      //It is for our searching
      const searchForArticles = async()=>{
        if(searchQuery){
            setIsSearching(true)
            const params = {
                q: searchQuery,
                pageSize: 25,
                apiKey
            };
            const response = await axios.get(
                // real api is only for development use in production it will not work
                // 'https://newsapi.org/v2/everything',

                //Fake news api
                'https://mocki.io/v1/005a7598-0d58-44bf-bac8-80f2661e97d1',
                {params}
            )
            setSearchNews(response.data.articles)
            setIsSearching(false)
        }
      }

      //Call these funcctions
      getTopHeadlines();
      searchForArticles();

      // lets save category and country selected by user to local storage
      localStorage.setItem('selectedCategory', category);
      localStorage.setItem('selectedCountry', country);

      // saving toggle b/n dark and light mode
      const body = document.querySelector("body");
      isDarkMode ? body.classList.add("dark") : body.classList.remove("dark");
      localStorage.setItem("darkMode", isDarkMode.toString());

    }, [category, country, page, searchQuery, isDarkMode])
    
    //define function for searching
    const handleSearchSubmit = (e)=>{
        e.preventDefault()
        setPage(1);
    }

    
    //define function for selecting country
    const handleCountryChange = (e)=>{
        setCountry(e.target.getAttribute('value'))
        setActiveLiCountry(e.target);
    }

    
    //define function for selecting category
    const handleCategoryChange = (e)=>{
        setCategory(e.target.getAttribute('value'))
        setActiveLiCategory(e.target);
    }

    
    //define function for handle page change
    const handlePageChange = (pageNumber)=>{
        setPage(pageNumber)
    }

  return (
    <>
        <div className='flex flex-wrap justify-center w-full text-slate-900 dark:text-slate-100'>
            <h1 className='text-center  text-4xl font-bold m-1 hover:cursor-pointer text-rose-600'>
                Newsster: The world in your hands
            </h1>
            <button className='text-3xl rounded-full font-bold' onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '🌞' : '🌚'}
            </button>

            <div className='w-full flex justify-center' value={country} onClick={handleCountryChange}>
                <ul className='border-b-2 border-rose-600 text-slate-900 dark:text-slate-100 rounded flex flex-row space-x-20 hover:cursor-pointer country'>
                    <li className={`${activeLiCountry === document.querySelector('ul.country li:nth-child(1)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="in">India</li>
                    <li className={`${activeLiCountry === document.querySelector('ul.country li:nth-child(2)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="gb">United Kingdom</li>
                    <li className={`${activeLiCountry === document.querySelector('ul.country li:nth-child(3)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="ca">Canada</li>
                    <li className={`${activeLiCountry === document.querySelector('ul.country li:nth-child(4)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="au">Australia</li>
                </ul>
            </div>

            <div className='w-full flex justify-center mb-5' value={category} onClick={handleCategoryChange}>
                <ul className='border-b-2 border-rose-600 text-slate-900 dark:text-slate-100 rounded flex flex-row space-x-20 hover:cursor-pointer category'>
                    <li className={`${activeLiCategory === document.querySelector('ul.category li:nth-child(1)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="general">General</li>
                    <li className={`${activeLiCategory === document.querySelector('ul.category li:nth-child(2)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="business">Business</li>
                    <li className={`${activeLiCategory === document.querySelector('ul.category li:nth-child(3)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="entertainment">Entertainment</li>
                    <li className={`${activeLiCategory === document.querySelector('ul.category li:nth-child(4)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="health">Health</li>
                    <li className={`${activeLiCategory === document.querySelector('ul.category li:nth-child(5)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="science">Science</li>
                    <li className={`${activeLiCategory === document.querySelector('ul.category li:nth-child(6)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="sports">Sports</li>
                    <li className={`${activeLiCategory === document.querySelector('ul.category li:nth-child(7)') ? 'text-rose-600' : 'hover:text-rose-600 hover:transition-all'}`} value="technology">Technology</li>
                </ul>
            </div>

            <div className='w-full flex'>
                <div className='w-full grid grid-cols-2'>
                    {   
                        isLoading ? (
                            <div className='flex justify-center items-center h-screen'>
                                <InfinitySpin color='#dc2626' width={100} />
                            </div>
                        ) : (
                            news.map((article, index) => (
                                <div className='w-full' key={index}>
                                    <div className='rounded-b-3xl overflow-hidden bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 hover:transition-all dark:hover:transition-all shadow-lg m-5 border dark:border-slate-600'
                                        style={{ height: '600px' }}
                                    >
                                        <img className='w-full h-80 object-cover' src={article.urlToImage ? article.urlToImage : substitute} alt={article.title}
                                            onError={(e) => { e.target.src = substitute }}
                                        />
                                        <div className='px-6 py-4 h-56'>
                                            <div className='font-bold text-xl mb-2'>
                                                {article.title}
                                            </div>
                                            <p className='text-slate-700 dark:text-slate-300'>{article.description}</p>
                                        </div>
                                        <div className='flex justify-between items-baseline px-6'>
                                            <div className='text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900 px-3 py-1'>
                                                {article.source.name}
                                            </div>
                                            <a className='bg-rose-500 hover:bg-rose-600 hover:transition-all text-white font-bold py-2 px-4 rounded'
                                                href={article.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                Read More
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

                <div className='w-1/3'>
                    <div>
                        <form onSubmit={handleSearchSubmit}>
                            <div className='w-full flex justify-between bg-slate-50 dark:bg-slate-900 border-2 dark:border-slate-600 rounded-xl h-10 mt-5'>
                                <input
                                    type='text'
                                    className='bg-slate-50 dark:bg-slate-900 pl-5 text-rose-600 focus:outline-none rounded-xl'
                                    value={searchQuery}
                                    placeholder='search news articles...'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {/* <button type='submit' className='hover:bg-slate-100 px-2 pr-5'>Search</button> */}
                            </div>
                        </form>

                        {isSearching ? (
                            <div className='flex justify-center items-center h-screen'>
                                <InfinitySpin color='#dc2626' width={100} />
                            </div>
                        ) : (
                            <>
                                {
                                    searchNews.map((article) => (
                                        <>
                                            <div className='rounded-xl bg-slate-50 hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-800 hover:transition-all dark:hover:transition-all shadow-lg m-5 border dark:border-slate-600'>
                                                <img className='w-full h-36 object-cover rounded-t-xl' src={article.urlToImage ? article.urlToImage : substitute} alt={article.title}
                                                    onError={(e) => { e.target.src = substitute }}
                                                />
                                                <ul>
                                                <li className='p-2 m-2' key={article.title}><a href={article.url} target='_blank' rel='noreferrer'>{article.title}</a></li>
                                                </ul>
                                            </div>
                                        </>
                                    ))
                                }
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* build previous and next page buttons */}
            <div className='w-full flex justify-center mb-5'>
                <button className='text-red-600 bg-red-100 dark:bg-red-900 dark:text-slate-200 py-1 px-4 rounded mt-10 mr-5'
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                >Previous Page</button>

                <button className='text-red-600 bg-red-100 dark:bg-red-900 dark:text-slate-200 py-1 px-4 rounded mt-10 mr-5'
                onClick={() => handlePageChange(page + 1)}
                >Next Page</button>
            </div>

        </div>
    </>
  )
}

export default News
