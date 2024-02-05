import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Item from './Item';
const History = ({requests}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={({item}) => <Item item={item}/> }
        keyExtractor={(item, i) => i*i}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingVertical:10
  }
})

export default History

