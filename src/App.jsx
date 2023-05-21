
import PromptCard from "./Card";

import { useState,useEffect } from 'react'
import './App.css';



const App = () => {

  const api = import.meta.env.VITE_BASE_URL;

   const [getdata, setData] = useState([]);
   const [seacrhtext, setSeacrhtext] = useState('');
   const [seacrhTimeout, setseacrhTimeout] =  useState(null);
   const [searchResults, setsearchResults] =  useState([]);


  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch (`${api}`);
      const data = await response.json();
      
      console.log(data);
      
      setData(data);
    }
    fetchPosts();
  }, []) 

  const filterPrompts = (seacrhtext) => {
    const regex = new RegExp(seacrhtext); // "i" flag for case-insensitive search
    return getdata.filter(
      (item) => 
        regex.test(item.name) ||
        regex.test(item.home) ||
        regex.test(item.quote) ||
        regex.test(item.type) 
    );
  }


  const handleSearchChange = (e) => {
    clearTimeout(seacrhTimeout);
    setSeacrhtext(e.target.value);

    //debouce method
    setseacrhTimeout(
      setTimeout(()=>{
        const searchResult = filterPrompts(e.target.value);
        setsearchResults(searchResult);
      },500)
    )
  }


  return <>
        <main className='app'>

              {/* navbar */}
                <nav className='flex justify-between items-center w-full mb-16 pt-3'>
                    <div className="flex items-center gap-2">
                        <span className="w-[35px] h-[35px]  bg-gradient-to-r
                            from-primary to-gray-400 text-white text-lg font-[500] 
                            rounded-full flex items-center justify-center">M</span>
                    
                        <div className="leading-relaxed">
                            <h2 className="text-lg text-primary font[700]">Meyzan</h2>
                        </div>
                    </div>

                    <div className='hidden sm:flex'>
                          <button className="flex items-center justify-beetween gap-2
                            text-stone-700 font-[600] border border-solid
                            border-smallTextColor py-2 px-4 rounded-lg max-h-[40px]
                            hover:bg-primary hover:border-primary
                              hover:text-white hover:font-[500] ease-in duration-200">
                                      Test Coding
                          </button>
                    </div>
                </nav>
              {/* navbar */}

              {/* feed */}
                <section className="w-full flex flex-col  justify-center items-center ">
                    <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
                      Test & coding
                      <br className="max-md:hidden" />
                      <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent 
                      text-center">
                        Frontend Developer
                      </span>
                    </h1>
                    <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center">
                    Front-end web developers are responsible for implementing visual elements that are seen and interacted with by users to produce an attractive, interactive website appearance, and handle debugging (problems) that occur.
                    </p>

                    {/* feed */}
                </section>
              {/* end feed */}


              {/* section */}
               <div className='mt-16 mx-auto w-full  flex justify-center items-center flex-col gap-2'>
                    <form className='md:max-w-xl relative w-full flex justify-center items-center'>
                      <input 
                        type="text" placeholder="Searching"
                        value={seacrhtext}
                        onChange={handleSearchChange}
                        required
                        className='block w-full rounded-md border border-gray-200
                         bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer'
                      />
                    </form>

  
                    {seacrhtext ? (
                      
                      <PromptCard
                        dataa={searchResults}
                      />
                    ) : (
                      <PromptCard dataa={getdata} />
                    )}

                    
                </div>

              {/* end section */}


        </main>
  
  </>
}

export default App
