import React, {
    useEffect,
    useRef,
    useState
} from "react";
import io from "socket.io-client";
import Game from "./Game-class";
import Avatar from "../../../assets/avatar_none.jpeg";
import canvasBg from "../../../assets/canvasBg.jpeg";



const role:string = "spectator";


const socket = io(`http://${import.meta.env.VITE_IP}:5000/game`, {
    autoConnect: false,
    transports: ["websocket"],
    query: {
        role: role
    },
});


const GameView: React.FC = () => {
    
    const canvasRef = useRef(null);
    const rImageRef = useRef(null);
    const lImageRef = useRef(null);
    const rnameRef = useRef(null);
    const lnameRef = useRef(null);
    const lscore = useRef(null);
    const rscore = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const game:Game = new Game(socket, {canvasRef, rImageRef, lImageRef, rnameRef, lnameRef, lscore, rscore, buttonRef}, role,{bcWidth:600, bcHeight:400}, "WHITE", "WHITE", "WHITE", canvasBg);
        game.start();
    }, []);

    return(
        <div className="col-start-4 xs:col-start-3 sm:col-start-2 xl:col-start-3 col-end-13 md:pl-5 flex justify-center items-center flex-col bg-cover bg-center">
            <div className="flex items-center justify-between w-[90%] sm:w-[80%] my-6 md:my-9">
                <div className="flex justify-start items-center">
                    <img ref={lImageRef} className='flex w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-center bg-cover bg-gray-400' style={{backgroundImage: `url(${Avatar})`}} ></img>
                    <h6 ref={lnameRef}  className="text-white font-bold text-[7pt] xs:text-sm sm:text-lg ml-2 sm:ml-4 max-w-[5rem] md:max-w-[8rem] xl:max-w-[10rem] overflow-hidden text-ellipsis"></h6>
                </div>
                    <span ref = {lscore} className="text-black font-bold text-[7pt] xs:text-sm sm:text-3xl ml-1 sm:ml-4 lg:ml-8 border-2 w-6 sm:w-10 h-5 xs:h-6 sm:h-10 text-center rounded-md bg-white">{ "0"}</span>
                    <span className="text-white font-bold text-[7pt] xs:text-sm sm:text-3xl w-6 sm:w-10 h-5 xs:h-6 sm:h-10 text-center">VS</span>
                    <span  ref = {rscore} className="text-black font-bold text-[7pt] xs:text-sm sm:text-3xl mr-1 sm:mr-4 lg:mr-8 border-2 w-6 sm:w-10 h-5 xs:h-6 sm:h-10 text-center rounded-md bg-white">{ "0"}</span>
                <div className="flex justify-start items-center">
                    <h6 ref = {rnameRef} className="text-white font-bold text-[7pt] xs:text-sm sm:text-lg mr-2 sm:mr-4 text-right max-w-[5rem] md:max-w-[8rem] xl:max-w-[10rem] overflow-hidden text-ellipsis"></h6>
                    <img ref = {rImageRef} className='flex w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-center bg-cover bg-gray-400' style={{backgroundImage: `url(${Avatar})`}} ></img>
                </div>
            </div>
            < canvas className="rounded-2xl" ref={canvasRef}/>
            <button ref = {buttonRef} hidden className ="my-button  rounded-2xl text-white" style={{backgroundImage: `url(${canvasBg})`}}>next</button>
        </div>
    );
};

export default GameView;