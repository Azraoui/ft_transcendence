import React from 'react'
import { Link } from 'react-router-dom'
import avtar from '../../../assets/avatar.jpeg'
type TableRowProps =
    {
        params:
        {
            opponent: string,
            resutl: string,
            score: string,
            difficulty: string,
            time: string,

        }
    }

function TableRow({ params }: TableRowProps) {
    return (
        <tr className="border-b bg-[#242424]">
            <th scope="row" className="py-4 px-6 uppercase font-medium whitespace-nowrap ">
                <div className="flex items-center space-x-3">
                    <div className="avatar relative ">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={avtar} alt="Avatar Tailwind CSS Component" />
                        </div>
                        <div className={` h-2 w-2 bg-red-500 absolute bottom-1  right-0 ring-white ring-4 rounded-full`}></div>

                    </div>
                    <Link to={'/profile/:id'}>
                        <div className="font-bold"> {params.opponent}</div>
                    </Link>
                </div>
            </th>
            <td className="py-4 px-6 uppercase">
                {params.resutl}
            </td>
            <td className="py-4 px-6 uppercase">
                {params.score}
            </td>
            <td className="py-4 px-6 uppercase">
                {params.difficulty}
            </td>
            <td className="py-4 px-6 uppercase">
                {params.time}
            </td>
        </tr>
    )
}

export default TableRow