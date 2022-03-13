import React from "react";

export default function SearchBar() {
  return (
    <div className="search-bar hidden md:flex items-center justify-center ml-12">
      <input className="search-input text-white" placeholder="Search by address or username"></input>
    </div>
  );
}
