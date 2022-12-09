import React from 'react';
import Card from 'react-bootstrap/Card';
import api from "../../service/api";
import { useState, useEffect, useContext, } from "react";


import { Button } from 'react-bootstrap';
import { useNavigate, useNavigation } from 'react-router';
import { useDetailPokemon } from '../../contexts/DetailPokemon';



function Home() {
  const navigate = useNavigate()
  const [isLoading, setIsLoadind] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const { setPokemonName } = useDetailPokemon()


  async function getPokemons() {
    try {
      setIsLoadind(true);
      await api
        .get("/pokemon/")
        .then((response) => {
          //faz algo
          //console.log(response.data);
          const pokemon = response.data.results;
          console.log(response.data.results);

          setPokemons(pokemon);
          setIsLoadind(false);
        });
    } catch (error) {
      //caso que der errado
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      {pokemons.map((pokemon) => (
        <Card>
          <Card.Body>{pokemon.name}</Card.Body>
          <Button onClick={() => {
            setPokemonName(pokemon.name);
            navigate("/detalhes")
          }}>Detalhes</Button>
        </Card>
      ))}

    </>
  );
}

export default Home;