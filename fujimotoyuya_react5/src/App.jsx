import './App.css';
import React, { useEffect, useState } from 'react';
import { getAllPokemon } from "./pokemon";
import Card from './components/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
         let res = await getAllPokemon(initialURL);
         //console.log(res);
         setNextURL(res.next);
        loadPokemon(res.results)
    };

    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) =>{
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getAllPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    if(!prevURL) return;
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
  }
  const handleNextPage = async () => {
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
  };

  return (
    <>
    <Navbar />
    <div className="App">
      <div className='pokemonCardContainer'>
        {pokemonData.map((pokemon,i) =>{
          return(
            <Card key={i} pokemon={pokemon}/>
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
