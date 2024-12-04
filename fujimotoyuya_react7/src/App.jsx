import './App.css';
import React, { useEffect, useState } from 'react';
import { getAllNaruto } from "./characters";
import Card from './components/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://narutodb.xyz/api/character";
  const [narutoData, setNarutoData] = useState([]);
  // const [nextURL, setNextURL] = useState("");
  // const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
const fetchNarutoData = async () => {
  let res = await getAllNaruto(initialURL);
  console.log("API Response:", res); 
  if (res && res.characters) {
    setNarutoData(res.characters);
    // setNextURL(res.next || "");
    // setPrevURL(res.previous || "");
  } else {
    console.error("Unexpected API response structure:", res);
  }
};


    fetchNarutoData();
  }, []);

  const loadNaruto = (data) => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format:", data);
      return;
    }
    setNarutoData(data);
  };

  const handlePrevPage = async () => {
  //   if (!prevURL) return;
  //   let data = await getAllNaruto(prevURL);
  //   if (data && data.characters) {
  //     loadNaruto(data.characters);
  //     setNextURL(data.next || "");
  //     setPrevURL(data.previous || "");
    // }
  };
  
  const handleNextPage = async () => {
  //   if (!nextURL) {
  //     console.error("No next URL available");
  //     return;
  //   }
  //   try {
  //     let data = await getAllNaruto(nextURL);
  //     console.log("Next page data:", data);
  //     if (data && data.characters) {
  //       loadNaruto(data.characters);
  //       setNextURL(data.next || "");
  //       setPrevURL(data.previous || "");
  //     } else {
  //       console.error("Unexpected response on next page:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching next page:", error);
  //   }
  };

  return (
    <>
    <Navbar />
    <div className="App">
      <div className='narutoCardContainer'>
        {narutoData.map((characters,i) =>{
          return(
            <Card key={i} characters={characters}/>
          );
        }
      )}
      </div>
      <div className='btn'>
        <button onClick={handlePrevPage}>前へ</button>
        <button onClick={handleNextPage}>次へ</button>
      </div>
    </div>
    </>
  );
}

export default App;
