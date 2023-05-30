import React, { useState, useEffect } from 'react'
import { Button, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import App from '../App';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import appFirebase from '../credenciales'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc, Firestore } from 'firebase/firestore'
import firestore from 'firebase/firestore'
import 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
//components
import ItemTask from '../components/ItemTask'
const db = getFirestore(appFirebase)

type Props = StackScreenProps<RootStackParamList, 'ListProduct'>;


export const ListProduct = ({ navigation }: Props) => {
  
  const [listTask,setListTasks]=useState([])
  useEffect(()=>{
    getBooks()
  },[listTask])

  const getBooks=async()=>{
    let list=[];
    const response = await getDocs(collection(db, 'productos'))
    response.forEach (document=>{
      let id=document.id
      let nombre=document.data().nombre;
      let color=document.data().color;
      let cantidad=document.data().cantidad;
      let obj={id,nombre,color,cantidad}
      list.push(obj);

    })
    setListTasks(list)

  }

  const renderTask = ({ item }) => (
    <ItemTask 
        id={item.id}
        nombre={item.nombre}
        color={item.color}
        cantidad={item.cantidad}
      />
  );
  
  return (
    <ScrollView style={{backgroundColor:'#170F11'}}>
      <TouchableOpacity style={estilos.Boton} onPress={() => navigation.navigate('CreateProduct')}>
        <Text style={estilos.TextoBoton}>Agregar Producto</Text>
      </TouchableOpacity>
      <View>
        <Text style={estilos.TextoTitulo}>
          Lista de los Productos
        </Text>
        <FlatList data={listTask} renderItem={renderTask} keyExtractor={item=>item.id}/>
      </View>
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  Boton: {
    backgroundColor: 'lightblue',
    height: 35,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
    borderRadius:30
  },
  TextoBoton: {
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  TextoTitulo: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'snow',
    fontWeight: 'bold',
    fontSize: 22
  },
  TextoNombre: {
    fontSize: 16
  },
  BotonLista: {
    backgroundColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 3,
    padding: 5
  }
})
