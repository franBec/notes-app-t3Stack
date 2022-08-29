import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const PaginateSearch = ({currentPage, setCurrentPage, totalPages}: {currentPage: number, setCurrentPage: Dispatch<SetStateAction<number>>, totalPages: number}) => {
    const [currentPageActual, setCurrentPageActual]= useState<number>(currentPage)

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) =>{
        setCurrentPageActual(parseInt(e.target.value))
    }
    const handleClick = (currentPageActual: number) =>{
      if(currentPageActual > 0){
        var pagefinal = currentPageActual > totalPages ? 1 : parseInt(`${currentPageActual}`, 10);
        setCurrentPage(pagefinal)
        setCurrentPageActual(pagefinal)
      }else{
        MySwal.fire({
          title: "Pagina fuera de rango",
          icon: "warning",
          confirmButtonText: 'OK',
        })
      }

    }

    useEffect(() => { setCurrentPageActual(currentPage) }, [currentPage])

  return (
    <div className='mb-4 flex justify-center items-center gap-4 py-2 px-3 leading-tight  bg-blue-300 dark:bg-gray-900 p-2 text-white rounded-lg'>
        Página:
      <input type="number" step="1" className="p-1 text-black dark:text-white rounded-md dark:bg-gray-800" value={currentPageActual} onChange={(e) => handleChange(e)}></input>
      <button className="basic-button text-black" onClick={() => {handleClick(currentPageActual)}}>Ir</button>
    </div>
  )
}

export default PaginateSearch