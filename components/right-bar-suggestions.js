import React, { useEffect, useState } from "react";
import { getClubs } from "../util/util";
import SuggestionItem from "./suggestion-item";

export default function RightBarSuggestions({data}) {
  const [de, setData] = useState([]);
  useEffect(()=> {
    loadNFTS()
  }, [])

  async function loadNFTS(){
      let d=await getClubs();
    console.log(d)
       for(let i=0;i<d.length;i++){
        let obj={name:d[i][0],
        address:d[i][1],
      image:d[i][2],
    gallery:d[i][3]}
    de[i]=obj
    
       }
       console.log(de)
      }

  return (
    <div className="flex flex-col">
      <div className="suggestions-header flex" style={{ marginTop: 12 }}>
        <span className="text-14-bold mr-auto px-1" style={{ color: "#50faca" }}>
          Suggestions For You
        </span>
        <a href="#" className="text-12-bold px-1 text-green-400">
          See All
        </a>
      </div>
      <div
        className="right-bar-suggestions"
        style={{ paddingBottom: 8, paddingTop: 8 }}
      >
        {de.length==0?data.map((item,i) => {
          return <SuggestionItem data={item} key={i} />;
        }):de.map((item,i) => {
          return <SuggestionItem data={item} key={i} />;
        })}
      </div>
    </div>
  );
}
