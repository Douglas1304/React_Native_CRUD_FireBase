import React, { useState } from 'react'
import { Button, StatusBar, StyleSheet, Text, View, ScrollView, TextInput, Alert } from 'react-native'

//import firebase
import appFirebase from '../credenciales'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../navigator/StackNavigator'

const db = getFirestore(appFirebase)
type Props = StackScreenProps<RootStackParamList, 'CreateProduct'>;

export default function CreateProduct({ navigation }: Props) {
  const InitialState = {
    nombre: '',
    color: '',
    cantidad: ''
  }

  const [state, setState] = useState(InitialState)

  const handleChangeText = (value: any, name: any) => {
    setState({ ...state, [name]: value })
  }

  //arrow function
  const saveProduct = async () => {
    try {
      await addDoc(collection(db, 'productos'), {
        ...state
      })

      Alert.alert('Alerta', 'guardado con exito')
      //console.log(state)
      navigation.navigate('ListProduct')
    }
    catch {
      console.error(Error)
    }
  }
  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Agregar Producto</Text>
      <View style={estilos.inputgroup}>
        <TextInput placeholder='Nombre' style={estilos.textoimput} onChangeText={(value) => handleChangeText(value, 'nombre')}
          value={state.nombre} />
      </View>
      <View style={estilos.inputgroup}>
        <TextInput placeholder='Color' style={estilos.textoimput} onChangeText={(value) => handleChangeText(value, 'color')}
          value={state.color} />
      </View>
      <View style={estilos.inputgroup}>
        <TextInput placeholder='Cantidad' style={estilos.textoimput} onChangeText={(value) => handleChangeText(value, 'cantidad')}
          value={state.cantidad} />
      </View>
      <View>
        <Button title='Guardar Producto' onPress={saveProduct} />
      </View>
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 12,
    marginBottom: 20,
    color: 'black'
  },
  container: {
    //flex hace que el view ocupe el 100% del contenedor padre
    flex: 1,
    padding: 35
  },
  inputgroup: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textoimput: {
    fontSize: 22
  }
})

