import React from 'react'

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';


function LeftPart() {

  return (
    <div className="col-span-4  max-h-[800px] w-full sm:px-12 px-1 bg-[#242424] py-4">
      <div className="flex items-center h-full flex-col justify-between relative mb-2 space-y-5">
        <div className='w-full  overflow-auto  scrollbar-hide flex flex-col'>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-accent">That's never been done in the history of the Jedi. It's insulting!</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-success">You have been given a great honor.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-error">It's never happened before.</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-accent">That's never been done in the history of the Jedi. It's insulting!</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-success">You have been given a great honor.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-error">It's never happened before.</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-accent">That's never been done in the history of the Jedi. It's insulting!</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-success">You have been given a great honor.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-error">It's never happened before.</div>
          </div>
        </div>
        <div className=' w-full  bottom-0 rounded-lg'>
          <div className="flex w-full justify-center">
            <div className="mb-3 max-w-6xl  w-full relative">
              <div className='right-0 -top-1 rounded-full absolute h-14 w-14 bg-login-gradient flex items-center justify-center '>
                <PaperAirplaneIcon className='header-icon text-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'/>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered text-gray-700 rounded-full input-primary w-full " />
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default LeftPart