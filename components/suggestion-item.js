import React, { useEffect, useState } from "react";
import ProfilePic from "./profile_pic";
import Clickable from "./clickable";
import UsernameText from "./username-text";
import { insertFollower, selectFollower } from "../util/util";

export default function SuggestionItem({ data }) {

  const [rm, setrm]= useState([])
 console.log(rm)
  // useEffect(()=> {
  //   loadFollow()
  // }, [])

  // async function loadFollow(){
  //   let d=await selectFollower()
  //   for(let i=0;i<d.length;i++){
  //     let obj={address:d[i][0],
  //     }
  //  rm[i]=obj
  //    }
  // }

  async function addToFollower(){
    let result = await insertFollower(data.address,data.name,data.image)
    if(result){
      setrm(data.address)
    }
  }

  return (
    
    <div className="suggestion-item py-2 px-3 h-auto flex items-center bg-gray-900 text-white">
      <ProfilePic size={32} src={data.image} username={data.name!==""?data.name:data.username} />
      <div className="suggestion-user-info ml-3 flex flex-col text-white">
        <UsernameText
          username={data.name!==""?data.name:data.username}
          className="text-14-bold cursor-pointer text-white"
        />
        
      </div>
      <div className="follow-button text-12-bold flex items-center ml-auto text-purple-500 cursor-pointer" onClick={addToFollower} >
       + Follow
      </div>
    </div>
  );
}
