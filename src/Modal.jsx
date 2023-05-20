
import React from "react";

import { useEffect, useMemo, useState } from "react";

const Modal = ({activeID, setShowModal}) => {

    // console.log(activeID,'modal_id');

    const api = import.meta.env.VITE_BASE_URL;


    const [value, setValue] = useState([]);
    

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch (`${api}`);
          const data = await response.json();
          setValue(data);
        }
        fetchPosts();    
    }, []) 

    const getData =  value.find(item => item.name === activeID);


  return (
    
    <div className="w-full h-full fixed top-0 left-0 z-10 bg-dark bg-opacity-70">
        <div className="w-96 md:w-[600px] absolute top-1/2 left-1/2 z-20 bg-white rounded-lg
              -translate-x-1/2 -translate-y-1/2 p-5">

           
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">Edit your data name {getData?.name}</h3>
                <form className="space-y-6" >
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                        <input value={getData?.name} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                         block w-full p-2.5" required />
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900">Your Quote</label>
                        <textarea  rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                         border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                         value={getData?.quote} 
                         />
                          

                    </div>
                  
                    <button type="submit" 
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Edit</button>
                   
                </form>
            </div>

            <button onClick={()=> setShowModal(false)} className="w-[1.8rem] h-[1.8rem] text-white
             bg-dark absolute top-[-0.5rem] right-[-0.5rem] text-lg rounded-lg
            flex items-center justify-center cursor-pointer leading-0
            ">
                    &times;
            </button>

        </div>
      
    </div>

  )
}

export default Modal
