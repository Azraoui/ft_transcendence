import { useState } from "react";
import { Link } from "react-router-dom";
import { TabLiveContentData, TabPlayContentData } from "../../model/TabsContentDB";

import { TabLinks } from "../../model/TabsDB";
import { TabsLiveContent, TabsPlayContent } from "./TabsContent";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex flex-col w-full space-y-16">
            <div className="flex items-start  justify-start sm:space-x-8 sm:flex-row flex-col   sm:space-y-0 space-y-3 ">

                <div onClick={() => { setActiveTab(0) }} className={`rounded-2xl border cursor-pointer py-1 px-4 ${activeTab === 0 && "bg-tab-gradient"} hover:bg-tab-gradient`}>Play</div>
                <Link onClick={() => { setActiveTab(1); } } className={`rounded-2xl border cursor-pointer py-1 px-4 ${activeTab === 1 && "bg-tab-gradient"} hover:bg-tab-gradient`} to={"/live-games"}>Live</Link>

            </div>
            <div className="flex items-center justify-around xl:flex-row flex-col xl:space-x-4   px-10">
                {

                    TabPlayContentData.map((items) => (
                        <TabsPlayContent key={items.id} params={items} />
                        ))
            }
                        
                     
            </div>
        </div>

    );
}