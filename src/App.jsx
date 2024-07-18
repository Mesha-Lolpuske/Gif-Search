import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // 3. image url state
  const [imageUrl, setImageUrl] = useState("");
  //  7. create search text state
  const [searchText, setSearchText] = useState(""); // do this

  //   11. create an isSearching state
  const [isSearching, setIsSearching] = useState(false);

  //   4. useEffect that will execute after the first render
  useEffect(() => {
    // 5. declare the first gif fetching function
    async function fetchFirstGif() {
      try {
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/translate?api_key=77gRTRxbn27OhovGyc69Lu8ccAYcf8qd&s=cats"
        );

        const result = await response.json();
        console.log(result);
        setImageUrl(result.data.images.original.url);
      } catch (error) {
        console.log(error.message);
      }
    }

    //6. call the function
    fetchFirstGif();
  }, []);

  async function handleGifSearch(e) {
    try {
      // 10. prevent default submit behavior
      e.preventDefault();
      setIsSearching(true);

      if (searchText.trim() === "") return;

      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=77gRTRxbn27OhovGyc69Lu8ccAYcf8qd&s=${searchText}`
      );

      const result = await response.json();
      setImageUrl(result.data.images.original.url);
      setIsSearching(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    // 1. begin here
    // 2. styling
    <div className="container">
      <h1 className="heading">GIF Search!</h1>

      <p className="search-term">Search results for: </p>

      <img className="results-image" src={imageUrl} alt="" />

      {/* 9. handle submit event */}
      <form onSubmit={handleGifSearch} className="input-form">
        <input
          // 8. giv it a value and an onchange handler
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
          type="text"
        />
        <button className="search-button">
          {isSearching ? "..." : "Search"}
        </button>
      </form>
    </div>
  );
}
