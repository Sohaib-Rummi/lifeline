import React from 'react'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Iconic = ({name, size, color, style, onPress}) => {
  return (
    <TouchableOpacity style={style} onPress={()=>onPress && onPress()}>
        <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default Iconic
