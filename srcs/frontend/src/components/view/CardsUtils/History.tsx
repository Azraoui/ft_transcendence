import React from 'react'
import { HistoryData } from '../../model/HistoryDB'
import TableRow from './TableRow'

function History() {
    return (
     
        <div className='flex w-full flex-col '>

            <h1 className='w-full font-bold sm:text-xl px-10 py-12 text-center'> History</h1>
            <div className='w-full bg-[#242424] ring-2 ring-white overflow-x-auto h-[500px]  rounded-lg '>
                <table className="w-full text-sm text-left ">
                    <thead className="text-xs text-white uppercase  bg-login-gradient">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                opponent
                            </th>
                            <th scope="col" className="py-3 px-6">
                                result
                            </th>
                            <th scope="col" className="py-3 px-6">
                                score
                            </th>
                            <th scope="col" className="py-3 px-6">
                                difficulty
                            </th>
                            <th scope="col" className="py-3 px-6">
                                time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       { HistoryData.length ?   HistoryData.map((items) => (
                            <TableRow key={items.id} params={items}/>
                       ))
                    : <div className='uppercase  font-bold'> No Data available</div> 
                    }
                      
                    </tbody>
                   
                </table>

            </div>
        </div>

    )
}

export default History