import Link from 'next/link'
import React from 'react'

const Admin = () => {

  

    
  return (
    <div className='max-w-xl  mx-auto h-screen p-4'>
      
      <div className='flex items-center justify-between px-8 py-6 bg-gray-800 rounded-xl'>
       

        <h1 className=""> 9:30 PM TOURNAMENT</h1>


          <Link href={"/team/YT434GR930"}>
          <button className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg ">
          View Teams
        </button>
          </Link>
        


      </div>
      <div className='flex items-center my-4 justify-between px-8 py-6 bg-gray-800 rounded-xl'>
       

        <h1 className=""> 10:40 PM TOURNAMENT</h1>


         <Link href={"/team/YT859GR1040"}>
          <button className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg ">
          View Teams
        </button>
          </Link>
      </div>
    </div>
  )
}

export default Admin