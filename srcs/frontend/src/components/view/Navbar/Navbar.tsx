import React from 'react'
import { navLinks } from '../../model/NavDB'
import NavItem from './NavItem'

function Navbar() {
    return (
        <nav className='col-span-2  bg-[#242424] min-h-[90vh] w-[80px] xl:w-[280px] pt-8 px-1 flex flex-col items-start justify-around'>
            <div className='space-y-8 w-full'>
                {
                    navLinks.slice(0, 4).map((link) => (
                        <NavItem key={link.id} link={link} />
                    ))
                }
            </div>
            <div>
                {
                    navLinks.slice(4).map((link) => (
                        <NavItem  key={link.id} link={link} />
                    ))
                }
            </div>

        </nav>
    )
}

export default Navbar