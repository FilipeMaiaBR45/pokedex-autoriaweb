import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDetailPokemon } from "../../contexts/DetailPokemon";
import api from "../../service/api";

// import { Container } from './styles';

function Detalhes() {
  const { pokemonsName } = useDetailPokemon();
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(pokemonsName);

  async function getDetailPokemon() {
    try {
      setIsLoading(true);
      await api.get(`/pokemon/${pokemonsName}`).then((response) => {
        //faz algo
        //console.log(response.data);
        const pokemon = response.data;
        console.log(response.data);

        setPokemonData(pokemon);
        setIsLoading(false);
      });
    } catch (error) {
      //caso que der errado
      console.log(error);
    }
  }

  useEffect(() => {
    getDetailPokemon();
  }, []);

  return (
    <Card style={{ width: "18rem" }}>
      
      <Card.Title>Name: {pokemonData.name}</Card.Title>
      
    </Card>
  );
}

export default Detalhes;
