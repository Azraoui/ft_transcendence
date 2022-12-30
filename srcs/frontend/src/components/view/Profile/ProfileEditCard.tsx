import React from 'react'
import Acheivements from './Acheivements'
import ProfileImage from './ProfileImage'
export function ProfileEditCard() {
  return (
    <div className='col-span-2 bg-[#242424] ring-2 ring-gray-600 ring-offset-1 rounded-md w-full  flex flex-col items-center justify-evenly  px-4 pt-12 pb-6'>
      <div className='flex flex-col items-center justify-between ring-2 ring-gray-600 ring-offset-1 rounded-md px-2 sm:px-12 pt-12 pb-6 shadow-lg shadow-slate-700 w-3/4 space-y-8' >
        <ProfileImage />
        <div className="mb-3 w-full">
          <label htmlFor="formFile" className="form-label inline-block mb-2">Choose your Image</label>
          <input type="file" className="file-input file-input-bordered file-input-accent w-full text-gray-700 " />
          {/* <input className="form-control block w-full px-3 py-1.5 text-base font-normal    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" /> */}
        </div>
        <div className="flex w-full justify-center">
          <div className="mb-3 w-full">
            <label htmlFor='exampleText0' className="form-label inline-block mb-2 ">Name</label>
            <input type="text" placeholder="Mohamed El Hadjaoui" className="input input-bordered input-success w-full" />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="mb-3 w-full">
            <label className="form-label inline-block mb-2 ">About You</label>
            <textarea className="textarea textarea-accent w-full text-gray-800" placeholder="Bio"></textarea>
          </div>
        </div>

        <div className="form-control flex w-full justify-center ">
          <label className="cursor-pointer label">
            <span className="label-text text-white font-extrabold sm:text-xl">Enabale 2f verification</span>
            <input type="checkbox" className="toggle toggle-accent"  />
          </label>
        </div>
        <button className="btn btn-accent transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">Save</button>
        
      </div>


      <Acheivements />

    </div>
  )
}

