import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios"; // for fetching the json data from url
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // todo : new
  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemons() {
    setIsLoading(true);
    const response = await axios.get(pokedexUrl); // DOWNLOAD 20 POKEMONS
    // console.log(`response >`);
    // console.log(response);

    // todo : setting the prevUrl and nextUrl
    setPrevUrl(response.data.previous);
    setNextUrl(response.data.next);

    const pokemonResults = response.data.results;
    // WE GET THE ARRAY OF POKEMONS FROM 'RESULTS' PROPERTY
    // console.log("pokemonResults");
    // console.log(pokemonResults);

    // ITERATING OVER THE ARRAY OF POKEMONS,AND USING THEIR URLS TO CREATE AN ARRAY OF PROMISES
    // THAT WILL DOWNLOAD THOSE 20 POKEOMONS
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    console.log("pokemonResultsPromise Array:");
    console.log(pokemonResultPromise);

    // PASSING THAT PROMISES-ARRAY TO 'axios.all()'
    const pokemonData = await axios.all(pokemonResultPromise);
    // ARRAY OF 20 POKEMONS DETAILED DATA
    console.log("pokemonData >");
    console.log(pokemonData);

    // NOW ITERATING THE ABOVE 20 POKEMONS (DETAILED)DATA
    // AND EXTRACT ID,NAME,IMAGE_URL,TYPE FROM IT.
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      // console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    console.log("res >");
    console.log(res);

    // save the data of 20 pokemons in array of "pokemonList"
    setPokemonList(res);

    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={prevUrl === null}
          onClick={() => setPokedexUrl(prevUrl)}
        >
          Prev
        </button>
        <button
          disabled={nextUrl === null}
          onClick={() => {
            setPokedexUrl(nextUrl);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;

//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
// 1: useEffect(() => {},[]);
//---- callback executes at intial phase (only once)-> component-renders
// 2: useEffect(() => {});
//---- callback executes intial phase as well as component renders if any state changes (x or y)
// 3: useEffect(() => {},[x]);
//---- callback executes initial as well as the 'x' changes.
