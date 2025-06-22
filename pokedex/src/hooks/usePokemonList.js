import axios from "axios"; // for fetching the json data from url
import { useEffect, useState } from "react";

function usePokemonList() {
  // intial-setup
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // todo: v2
    setPokemonListState({ ...pokemonListState, isLoading: true });

    // todo: v
    const response = await axios.get(pokemonListState.pokedexUrl);
    // DOWNLOAD 20 POKEMONS OR
    // GET THE TYPE BASED POKEMONS
    // todo : setting the prevUrl and nextUrl
    // todo : advanced-state management
    // todo: v2
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResults = response.data.results;
    // WE GET THE ARRAY OF POKEMONS FROM 'RESULTS' PROPERTY
    // console.log("pokemonResults");
    console.log(`pokemonResults >`, pokemonResults);
    // ITERATING OVER THE ARRAY OF POKEMONS,AND USING THEIR URLS TO CREATE AN ARRAY OF PROMISES
    // THAT WILL DOWNLOAD THOSE 20 POKEOMONS
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // console.log("pokemonResultsPromise Array:");
    // console.log(pokemonResultPromise);

    // PASSING THAT PROMISES-ARRAY TO 'axios.all()'
    const pokemonData = await axios.all(pokemonResultPromise);
    // ARRAY OF 20 POKEMONS DETAILED DATA
    // console.log("pokemonData >");
    // console.log(pokemonData);

    // NOW ITERATING THE ABOVE 20 POKEMONS (DETAILED)DATA
    // AND EXTRACT ID,NAME,IMAGE_URL,TYPE FROM IT.
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      // console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    // console.log("pokeListResult >");
    // console.log(pokeListResult);

    // save the data of 20 pokemons in array of "pokemonList"
    // todo: v2
    // todo-ref: https://react.dev/learn/queueing-a-series-of-state-updates
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  // finally return the [,] array of usePokemonList custom-hook
  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
