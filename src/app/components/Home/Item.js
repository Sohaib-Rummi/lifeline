import React from 'react'
import {  Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { colors } from '../../constants/Colors'

const Item = ({ title, image, onPress, imageStyle }) => {

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress && onPress()}>
      <Image source={image} style={[styles.image, imageStyle && imageStyle]} resizeMode='contain'/>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: 70,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: colors.white,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image:{
    width:40,
    height:40,
  },
  title:{
    fontFamily:'Roboto-Regular',
    color: colors.red_100,
    fontSize:20,
    marginLeft:10,
  }
});

export default Item
