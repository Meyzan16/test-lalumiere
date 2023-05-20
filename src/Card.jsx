
import React from 'react';

import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";

const PromptCard = ({dataa}) => {

    const api = import.meta.env.VITE_BASE_URL;
    const [selectedCategory, setSelectedCategory] = useState();
    const [value, setValue] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch (`${api}`);
          const data = await response.json();
          
       
          setValue(data);
        }
        fetchPosts();
    }, []) 
    

    const handleChange = (ev) => {
        setSelectedCategory(ev.target.value);
    };
    // console.log(selectedCategory);
    
    function getFilteredList() {
        return value.filter((item) => item.home === selectedCategory);
    }
    
    var filteredList = useMemo(getFilteredList, [selectedCategory, value]);

    // modal
    const [showModal, setShowModal] = useState(false);
    const [activeID, setactiveID] = useState(null);
    
    const showModalHandler = id =>{
      setShowModal(true)
      setactiveID(id)
    }

  return (

    <section>
      <div className=" mt-12  mb-12 relative  overflow-x-auto shadow-md sm:rounded-lg">
          <div className="pb-4 bg-primary bg-opacity-50 px-4 py-4">
           
                <select value={selectedCategory} onChange={handleChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-primary focus:border-primary block w-full p-2.5">
                    <option >select data</option>
                  {
                    dataa.map((a,index) => (
                      <option key={index} value={a.home}>
                        {
                            a.home
                        }
                    </option>
                    ))
                  }
               
                </select>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          home
                      </th>
                      <th scope="col" className="px-6 py-3">
                          quote
                      </th>
                      <th scope="col" className="px-6 py-3">
                          type
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
               {
                selectedCategory ? (
                    filteredList.map((a,index) => (
                        
                          <tr key={index} className="bg-white border-b 
                             hover:bg-gray-50 ">
                              <th scope="row" className="px-6 py-4 font-medium
                               text-gray-900 whitespace-nowrap">
                                  {a.name}
                              </th>
                              <td className="px-6 py-4">
                                  {a.home}
                              </td>
                              <td className="px-6 py-4">
                                  {a.quote}
                              </td>
                              <td className="px-6 py-4">
                                  {a.type}
                              </td>
                              <td className="px-6 py-4 ">
                                <span  className='text-white bg-primary py-2 px-4 rounded-lg hover:bg-teal-600 cursor-pointer'>
                                     edit
                                </span>
                              </td>
                          </tr>
                        )
                      
                    )

                ) : (
                    dataa.map((a,index) => (
                        
                        <tr key={index} className="bg-white border-b 
                           hover:bg-gray-50 ">
                            <th scope="row" className="px-6 py-4 font-medium
                             text-gray-900 whitespace-nowrap">
                                {a.name}
                            </th>
                            <td className="px-6 py-4">
                                {a.home}
                            </td>
                            <td className="px-6 py-4">
                                {a.quote}
                            </td>
                            <td className="px-6 py-4">
                                {a.type}
                            </td>
                            <td className="px-6 py-4 ">
                              <span onClick={()=> showModalHandler(a.name)}  className='text-white bg-primary py-2 px-4 rounded-lg hover:bg-teal-600 cursor-pointer'>
                                   edit
                              </span>
                            </td>
                        </tr>
                      )
                    
                  )
                )
                }
                  
              </tbody>
          </table>

          {
          showModal && <Modal setShowModal={setShowModal} activeID={activeID} />
            }
      </div>
    </section>


    // <div className=' flex-1 break-inside-avoid rounded-lg border
    //  border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 
    //   md:w-[360px] '>
        
    //   <div className='flex justify-between items-start gap-5'>
    //     <div className='flex justify-start items-center gap-3 cursor-pointer'>

    //       <div className='flex flex-col'>
    //         <h3 className='font-semibold text-gray-900'>{post.name}</h3>
    //         <p className='font-inter text-sm text-gray-500'>{post.quote}</p>
    //       </div>

    //     </div>


    //   </div>
      
    //     <p className='my-4 font-satoshi text-sm text-gray-700'>{post.home}</p>
    //     <p className='font-inter text-sm blue_gradient cursor-pointer'
    //         onClick={() => {}}
    //         >
    //             #{post.type}
    //     </p>
    // </div>
  )
}

export default PromptCard
