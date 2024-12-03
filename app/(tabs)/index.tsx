import {Button, FlatList, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React, {SetStateAction, useCallback, useState} from "react";
import type {ListRenderItem} from "@react-native/virtualized-lists";

const data = new Array(5).fill(0).map((_, index) => {
  return {
    name: `${index}`
  }
})

const renderItem = (change: React.Dispatch<SetStateAction<number>>): ListRenderItem<{ name: string }> => {
  console.log('renderItem: create')
  return ({item}) => {
    console.log("renderItem", item.name)
    return <ThemedView>
      <ThemedText>
        {item.name}
      </ThemedText>
      <Button title={`state change from ${item.name}`} onPress={() => change(state => ++state)}/>
    </ThemedView>
  }
}

export function First() {
  console.log("FIRST")
  const [state, setState] = useState(0)

  return (
    <ThemedView>
      <FlatList data={data} renderItem={renderItem(setState)}/>
      <ThemedText>currentState {state}</ThemedText>
      <Button title={'state change root'} onPress={() => setState(state => ++state)}/>
    </ThemedView>
  );
}


export function Second() {
  console.log("SECOND")
  const [state, setState] = useState(0)

  const renderItem: ListRenderItem<{ name: string }> = useCallback(({item}) => {
    console.log("renderItem", item.name)
    return <ThemedView>
      <ThemedText>
        {item.name}
      </ThemedText>
      <Button title={`state change from ${item.name}`} onPress={() => setState(state => ++state)}/>
    </ThemedView>
  }, [])

  return (
    <ThemedView>
      <FlatList data={data} renderItem={renderItem}/>
      <ThemedText>currentState {state}</ThemedText>
      <Button title={'state change root'} onPress={() => setState(state => ++state)}/>
    </ThemedView>
  );
}

export default Second

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
