import { useState } from "react";
import { TabLiveContentData, TabPlayContentData } from "../../model/TabsContentDB";

import { TabLinks } from "../../model/TabsDB";
import {TabsLiveContent, TabsPlayContent} from "./TabsContent";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex flex-col w-full space-y-16">
            <div className="flex items-start  justify-start sm:space-x-8 sm:flex-row flex-col   sm:space-y-0 space-y-3 ">
                {TabLinks.map((item) => (
                    <div key={item.id} onClick={() => { setActiveTab(item.id) }} className={`rounded-2xl border cursor-pointer py-1 px-4 ${activeTab === item.id && "bg-tab-gradient"} hover:bg-tab-gradient`}>{item.title}</div>
                ))}
            </div>
            <div className="flex items-center justify-around xl:flex-row flex-col xl:space-x-4   px-10">
                {
                    activeTab  === 0 ? TabPlayContentData.map((items) => (
                        <TabsPlayContent key={items.id} params={items} />
                    )) :
                    TabLiveContentData.length ? TabLiveContentData.map((items) => (
                        <TabsLiveContent key={items} params={items} />
                    )) : <h1 className="font-bold"> no live games for the moment</h1>
                }
            </div>
        </div>

    );
}