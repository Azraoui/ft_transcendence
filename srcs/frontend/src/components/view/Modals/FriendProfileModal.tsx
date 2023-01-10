import React, { useEffect, useState } from 'react'
import Service from '../../controller/services';
import { TabFriendProfileLinks } from '../../model/TabsDB';
import Acheivements from '../CardsUtils/Acheivements';
import History from '../CardsUtils/History';
import ProfileImage from '../CardsUtils/ProfileImage';
import Stats from '../CardsUtils/Stats';

function FriendProfileModal({ id }: { id: number }) {

    const [data, setData] = useState({
        firstName: "",
        id: 0,
        lastName: "",
        nickName: "",
        username: "",
        picture: "",
        bio: "",
        active: "on"
    })
    const [tab, setTab] = useState(0);

    useEffect(() => {
        // console.log(window.location.pathname.split("/").pop());
        retrieveFriendProfile();
    }, []);

    const retrieveFriendProfile = () => {
        Service.viewFriend(id)
            .then((response: any) => {
                console.log(response.data);
                setData(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    return (
        <div>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                    <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex items-start  justify-start mb-8 sm:space-x-8 sm:flex-row flex-col   sm:space-y-0 space-y-3 ">

                        {TabFriendProfileLinks.map((item) => (
                            <div key={item.id} onClick={() => { setTab(item.id) }} className={`btn ${tab === item.id && "bg-tab-gradient"}`}>{item.title}</div>
                        ))}
                        
                    </div>
                    {
                        tab === 0 ?
                        
                            <div className='flex flex-col items-center justify-center space-y-4'>
                                {/* <hr className=' bg-slate-400 w-full' /> */}

                                <ProfileImage avatar={data.picture} />
                                <h5 className="lg:text-xl text-sm text-center font-medium ">{data.firstName} {data.lastName}</h5>
                                <span className="lg:text-lg text-xs text-center  font-extralight ">{data.nickName}</span>
                                <span className="lg:text-lg text-xs text-center  font-extralight ">{data.bio}</span>
                                <Stats></Stats>
                                <Acheivements></Acheivements>
                            </div>
                            :
                            <History></History>
                    }
                </div>
            </div>
        </div>
    )
}

export default FriendProfileModal