import './App.css';
import React, { useEffect, useState } from 'react';
import { getAllNaruto } from "./characters";
import Card from './components/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://narutodb.xyz/api/character";
  const [narutoData, setNarutoData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchNarutoData = async () => {
         let res = await getAllNaruto(initialURL);
         //console.log(res);
         setNextURL(res.next);
        loadNaruto(res.results)
    };

    fetchNarutoData();
  }, []);

  const loadNaruto = async (data) =>{
    let _narutoData = await Promise.all(
      data.map((characters) => {
        let narutoRecord = getAllNaruto(characters.url);
        return narutoRecord;
      })
    );
    setNarutoData(_narutoData);
  };

  const handlePrevPage = async () => {
    if(!prevURL) return;
    let data = await getAllNaruto(prevURL);
    await loadNaruto(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
  }
  const handleNextPage = async () => {
    let data = await getAllNaruto(nextURL);
    await loadNaruto(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
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
