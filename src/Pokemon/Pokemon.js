import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pokemon extends Component{
  render(){
    const {pokemon,id} = this.props;
    const styles = {
      'textTransform': 'capitalize'
    }
    return (
      <div className="pokemon--species">
        <div className="pokemon--species--container">
          <Link to={`/${id}`}>
            <div className="pokemon--species--name" style={styles}>{`${id}. ${pokemon.name}`}</div>
            <div className="pokemon--species--sprite">
              <img src={`/sprites/${id}.png`} alt={pokemon.name} />
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Pokemon;