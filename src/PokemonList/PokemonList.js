import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Pokemon from '../Pokemon/Pokemon';

class PokemonList extends Component{
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
    };
  }
  componentDidMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.co/api/v2/pokemon?limit=811').then(res=>res.json())
    .then(response=>{
      this.setState({
        species : response.results,
        loading : true,
        fetched : true
      });
    });
  }

  render(){
    const {fetched, loading, species} = this.state;
    if(fetched){
      return <div className="pokemon--species--list">{species.map((pokemon,index)=><Pokemon key={pokemon.name} id={index+1} pokemon={pokemon}/>)}{this.props.children}</div>;
    }else if(loading && !fetched){
        return <p className="pokemon--loading"> Loading ...</p>;
    }
    else{
      return <div/>;
    }
  }
}

export default PokemonList;