import { useState, useEffect } from "react";

import Layout from "../components/layout";
import Stories from "../components/stories";
import FeedItem from "../components/feed-item";
import HomeRightBar from "../components/home-right-bar";
import MoreModalItems from "../components/more-modal";

import LoginUserHook from "../hooks/global_hook";
import { getProfile } from "../util/util";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [stories, setStories] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [feed, setFeed] = useState(null);

  const updateLoginUser = (data) => {
    setLoginUser(data);
    setLoginData(data);
  };

  useEffect(() => {
    load()

    fetch("/api/feed")
      .then((response) => response.json())
      .then((data) => setFeed(data));

    fetch("/api/suggestions")
      .then((response) => response.json())
      .then((data) => setSuggestions(data));

    fetch("/api/stories")
      .then((response) => response.json())
      .then((data) => setStories(data));
  }
  , []);

  const load = async()=>{
    let data = await getProfile();
    if(data.length==0){
        router.push("/profile")
    }else{
      setUsername(data[0].username)
      setImage(data[0].profile_img)
      setAddress(data[0].address)
    }
  }

  return (
    <>
     
        <Layout >
          <MoreModalItems />
          <div className="homepage-feed lg:mr-8 flex flex-col justify-center">
            <Stories stories={stories} />
            {feed &&
              feed.map((item) => {
                return <FeedItem data={item} key={item.pid} />;
              })}
          </div>
          
          <HomeRightBar data={suggestions} />
          
        </Layout>
     
    </>
  );
}
