import React from 'react';
import { addToFavorites } from '../actions/userActions';
import {connect} from 'react-redux';

const starStyles = { position: "absolute", top: 15, right: 15, cursor: 'pointer' };

const FavoriteStar = ({id, addToFavorites, favorites}) => {
  const isFavorite = favorites.indexOf(id) !== -1;
  return (
    <i className={`star icon ${isFavorite ? '' : 'outline'} yellow big favorite`} style={starStyles} onClick={() => addToFavorites(id)} ></i>
  )
};

const mapStateToProps = state => ({
  favorites: state.user.favorites
});

export default connect(mapStateToProps, { addToFavorites })(FavoriteStar);