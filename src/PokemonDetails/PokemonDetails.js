import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

class PokemonDetails extends Component{
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      pokemon: null
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch(`http://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(pokemon => this.setState({
        loading: false,
        pokemon: pokemon
      }))
      .catch(errors => this.setState({
        loading: false
      }))
  }
  componentDidUpdate (prevProps) {
    // respond to parameter change in /pokemon/:id url
    let oldId = prevProps.match.params.id
    let newId = this.props.match.params.id
    if (newId !== oldId)
      this.componentDidMount()
  }
  render(){
    const id = this.props.match.params.id;
    const outOfRange = (id, addition) => {
      id = parseInt(id,10);
      if ( (id + addition) < 1) {
        return 1;
      } else if ( (id + addition) > 811) {
        return 811;
      }
      return id + addition;
    }
    const {loading, pokemon} = this.state;
    if (loading || !pokemon) {
      return (
        <p className="pokemon--loading"> Loading ...</p>
      )
    }
    const styles = {
      'textTransform': 'capitalize'
    }
    return (
      <div className="pokemon--details">
        <Link className="back--to--list" to="/">Back to the list</Link>
        <Link className="link--to--next" to={`/${outOfRange(id,1)}`}>Next</Link>
        <Link className="link--to--prev" to={`/${outOfRange(id,-1)}`}>Prev</Link>
        <div className="pokemon--details--sprite">
          <img src={`/spriteshq/${id}.png`} alt={pokemon.name} />
        </div>
        <table style={styles}>
          <tbody><tr><td>Name</td><td>{pokemon.name}</td></tr></tbody>
          <tbody><tr><td>Base experience</td><td>{pokemon.base_experience}</td></tr></tbody>
          <tbody><tr><td>Weight</td><td>{pokemon.weight/10}kg</td></tr></tbody>
          <tbody><tr><td>Height</td><td>{pokemon.height*10}cm</td></tr></tbody>
        </table>
      </div>
    )
  }
}

export default PokemonDetails;