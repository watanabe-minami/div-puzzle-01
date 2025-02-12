import React, { useState, useEffect } from "react";
import { getAllNaruto } from "./characters"; // API呼び出し関数
import Card from "./components/Card";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const baseURL = "https://narutodb.xyz/api/character";
  const [narutoData, setNarutoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {
    fetchNarutoData(currentPage);
  }, [currentPage]);

  const fetchNarutoData = async (page) => {
    try {
      const url = `${baseURL}?page=${page}&limit=${pageSize}`;
      const res = await getAllNaruto(url);

      if (res && res.characters) {
        setNarutoData(res.characters);
        setTotalCharacters(res.totalCharacters || 0);
      } else {
        console.error("Unexpected API response:", res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalCharacters / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <div className="narutoCardContainer">
          {narutoData.map((character) => (
            <Card key={character.id} characters={character} />
          ))}
        </div>
        <div className="btn">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            前へ
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalCharacters / pageSize)}
          >
            次へ
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
