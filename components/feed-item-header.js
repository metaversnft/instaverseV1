import React from "react";
import ProfilePic from "./profile_pic";
import MoreSettings from "./icons/more_icon";
import UsernameText from "./username-text";

export default function FeedItemHeader({ moreClickEvent, username, image, address }) {
  return (
    <div className="feed-item-header pl-4 pr-4 bg-teal-900 text-white flex items-center rounded-md shadow-md">
      <ProfilePic src={image} size={32} username={username} />
      <UsernameText
        className="feed-item-header-text text-14-bold mr-1 ml-4 cursor-pointer"
        username={username || "username"}
      />
      <div className="text-gray-600 text-sm">
        <a>{address}</a>
      </div>
      
      <button className="ml-auto flex">
        <MoreSettings onClick={moreClickEvent} />
      </button>
    </div>
  );
}
