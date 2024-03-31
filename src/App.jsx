import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const ApiUrl = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
        const { results } = response.data;
        const pokemonDataPromises = results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemonList(pokemonData);
      } catch (error) {
        console.error(error);
      }
    };

    ApiUrl();
  }, []);

  return (
    <div className="container">
      <div className="display">
        {pokemonList.map((pokemon, index) => (
          <button style={{ display: "flex", alignItems: 'center', width: '250px', justifyContent: 'space-between', borderRadius: '6px', backgroundColor: 'aqua'}} key={index}>
            <img src={pokemon.sprites.front_default} alt="" />
            <h3 style={{marginRight: '10px',}}>{pokemon.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;