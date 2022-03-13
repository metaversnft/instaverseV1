import router from "next/router";
import React, { useEffect, useState } from "react";

import Layout from "../components/layout";
import { getAvatar, getSignerAddress, insertProfile } from "../util/util";



export default function Profile() {
  const [avatar, setAvatar] = useState([]);
  const [address, setAddress] = useState([]);
  const [formInput, updateFormInput] = useState({username:'',chain:'ETH'});
  useEffect(()=> {
    load()
  }, [])

  async function load(){
    setAddress(await getSignerAddress());
    setAvatar(await getAvatar(address))
    
  }


  async function  createProfile(){
    const {username,chain} =formInput;
    let result = await insertProfile(address,username,chain)
    if(result){
      router.push("/")
    }
     
}
  return(
    <Layout>
   
    <form className="w-full max-w-lg ">
    <div className="flex flex-wrap  -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Avatar
        </label>
        
        <img src={avatar} alt="a" width={100} height={100}/>
       
      </div>
      
    </div>
  <div className="flex flex-wrap  -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
       Username
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-username" type="text" placeholder="Jane"
       onChange={ e => updateFormInput({...formInput, username: e.target.value})} />
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>

  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Bio
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-bio" type="text" placeholder="I am Curious on Instaverse"/>
    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Address
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-bio" type="text" value={address} disabled/>
   
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">

    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Chain
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
          <option>Ethereum</option>
          <option>Polygon</option>
          <option>ImmutableX</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  
  </div>
  <div className="py-2">
  <button className="flex-shrink-0 bg-yellow-500 hover:bg-teal-700 border-yellow-500 hover:border-teal-700 text-sm border-4 text-gray-900 py-2 px-2 rounded" type="button" onClick={createProfile}>
      Create Profile
    </button>
    </div>
</form>

</Layout>
  )
}

//ignore this page, [pid] using for profile pages.
