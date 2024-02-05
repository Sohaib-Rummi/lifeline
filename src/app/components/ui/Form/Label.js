import React from 'react'
import { globalStyles } from '../../../constants/Style'
import { Text } from 'react-native'
const Label = ({label, style}) => {
  return (
    <Text style={[globalStyles.label, style && style]}>{label}</Text>
  )
}

export default Label
