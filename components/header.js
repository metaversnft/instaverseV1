import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

import SearchBar from "./search_bar";
import HomeIcon from "./icons/home_icon";
import DmIcon from "./icons/dm_icon";
import ExploreIcon from "./icons/explore_icon";
import ActivityIcon from "./icons/activity_icon";
import HomeIconActive from "./icons/home_icon_active";
import DmIconActive from "./icons/dm_icon_active";
import ExploreIconActive from "./icons/explore_icon_active";
import ActivityIconActive from "./icons/activity_icon_active";
import ProfilePic from "./profile_pic";
import Clickable from "./clickable";

import LoginUserHook from "../hooks/global_hook";
import MPIconActive from "./icons/marketplace_active";
import MPIcon from "./icons/marketplace";
import { getAvatar, getSignerAddress } from "../util/util";

export default function Header({ user }) {
  const router = useRouter();

  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);
  const [avatar, setAvatar] = useState([]);
  

  useEffect(()=> {
    load()
  }, [])
  async function load(){
    let address = await getSignerAddress();
    setAvatar(await getAvatar(address))
    setFirst(address.substring(0,7))
    setLast(address.substring(address.length,address.length-5))
  }

  async function mint(){
    router.push("/mint")
  }
  // set icons
  const home =
    router.pathname === "/" ? (
      <HomeIconActive className="header-icon" />
    ) : (
      <HomeIcon className="header-icon" />
    );
  const marketplace =
    router.pathname === "/marketplace" ? (
      <MPIconActive className="header-icon" />
    ) : (
      <MPIcon className="header-icon" />
    );
  const explore =
    router.pathname === "/explore" ? (
      <ExploreIconActive className="header-icon" />
    ) : (
      <ExploreIcon className="header-icon" />
    );
  const collection =
    router.pathname === "/collection" ? (
      <ActivityIconActive className="header-icon" />
    ) : (
      <ActivityIcon className="header-icon" />
    );

  // const { data, setLoginUser } = LoginUserHook();
  // const loginUserData = data;

  return (
    <nav className="navigation fixed z-20 top-0">
      <div className="header-container">
        <Clickable href="/">
          <img src="../static/images/iv_dark.gif" className="header-logo" width={150} height={150} />
        </Clickable>
        <SearchBar />
        <div className="header-icons flex ml-24 items-center">
          <Clickable href="/">{home}</Clickable>
          {/* <Clickable href="/messages">{messages}</Clickable> */}
          <Clickable href="/explore">{explore}</Clickable>
          <Clickable href="/collection">{collection}</Clickable>
           <Clickable href="/marketplace">{marketplace}</Clickable>
          {/* {user && (
            <ProfilePic
              className={
                loginUserData.username === user
                  ? "header-profile-pic-border"
                  : ""
              }
              src={loginUserData?.image}
              username={loginUserData?.username}
              style={{
                padding: loginUserData.username === user ? "2px" : "3px",
                marginLeft: "-2px",
              }}
              size={22}
            />
          )} */}
        </div>
       
      </div>
      <div>
   
    </div>
      <div className="md:flex items-stretch justify-center ml-auto px-2  py-2 mt-2  border-white">
      <button className="text-white bg-black border-2 border-white  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={mint}>Create</button>

     
      {first!==null?     
      <a className="text-white bg-black border-2 border-white  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><b> {first}...{last}</b></a>
    :
            <button className="text-white bg-black border-2 border-white  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
       }
      </div>
    </nav>
  );
}
