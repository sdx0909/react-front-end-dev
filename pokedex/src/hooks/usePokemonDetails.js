import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id) {
  const [pokemon, setPokemon] = useState({});
  //   let pokemonListHookResponse = [];

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const pokemonOfSameTypes = axios.get(
      `https://pokeapi.co/api/v2/type/${
        response.data.types ? response.data.types[0].type.name : ""
      }`
    );

    setPokemon((state) => ({
      ...state,
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
      similarPokemons: response.data.pokemon,
    }));

    pokemonOfSameTypes.then((response) => {
      setPokemon((state) => ({
        ...state,
        similarPokemons: response.data.pokemon,
      }));
    });

    setPokemonListState({
      ...pokemonListState,
      type: response.data.types ? response.data.types[0].type.name : "",
    });
  }

  const [pokemonListState, setPokemonListState] = usePokemonList();

  useEffect(() => {
    downloadPokemon();
    console.log("list:>", pokemon.types);
  }, []);

  return [pokemon];
}

export default usePokemonDetails;
