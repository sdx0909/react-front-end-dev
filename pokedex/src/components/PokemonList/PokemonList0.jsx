// *** here this code is old code that is optimized in Object:
// -----------------------------------------------------------

import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios"; // for fetching the json data from url
import Pokemon from "../Pokemon/Pokemon";

function PokemonList0() {
  // todo: advanced state-management
  // instead of creating the multiple states we have to create a single state.
  // that has multiple states in object.

  // todo: v2
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  // *** const [pokemonList, setPokemonList] = useState([]);
  // *** const [isLoading, setIsLoading] = useState(true);

  // todo: creating the state of url for multiple time changing for new pokemons
  // *** const [pokedexUrl, setPokedexUrl] = useState(
  // ***  "https://pokeapi.co/api/v2/pokemon"
  // *** );
  // *** const [nextUrl, setNextUrl] = useState("");
  // *** const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemons() {
    // todo: v2
    setPokemonListState({ ...pokemonListState, isLoading: true });
    // ***  setIsLoading(true);

    // todo: v2
    const response = await axios.get(pokemonListState.pokedexUrl);
    // DOWNLOAD 20 POKEMONS
    // *** const response = await axios.get(pokedexUrl);

    // console.log(`response >`);
    // console.log(response);

    // todo : setting the prevUrl and nextUrl
    // todo : advanced-state management
    // todo: v2
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));
    // *** setPrevUrl(response.data.previous);
    // *** setNextUrl(response.data.next);

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

    // *** setPokemonList(pokeListResult);
    // *** setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);
  // *** }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl === null}
          // *** onClick={setPokedexUrl(prevUrl)}
          // todo: v2
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.buttonnextUrl === null}
          // *** onClick={setPokedexUrl(prevUrl)}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList0;

//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
// 1: useEffect(() => {},[]);
//---- callback executes at intial phase (only once)-> component-renders
// 2: useEffect(() => {});
//---- callback executes intial phase as well as component renders if any state changes (x or y)
// 3: useEffect(() => {},[x]);
//---- callback executes initial as well as the 'x' changes.
