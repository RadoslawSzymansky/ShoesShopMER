import React from 'react';
import { addToFavorites, removeFromFavorites } from '../actions/userActions';
import {connect} from 'react-redux';

const starStyles = { position: "absolute", top: 15, right: 15, cursor: 'pointer' };

const FavoriteStar = ({id, addToFavorites, favorites, removeFromFavorites}) => {
  
  if(favorites.areLoading) return 'Loading'

  const isFavorite = favorites.indexOf(id) !== -1;
  const callBack = isFavorite ? removeFromFavorites : addToFavorites;

  return (
    <i className={`star icon ${isFavorite ? '' : 'outline'} yellow big favorite`} style={starStyles} onClick={() => callBack(id)} ></i>
  );
};

const mapStateToProps = state => ({
  favorites: state.user.favorites
});

export default connect(mapStateToProps, { addToFavorites, removeFromFavorites })(FavoriteStar);