import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View, Modal, Button } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import appFirebase from '../credenciales'

const db = getFirestore(appFirebase)


const ItemTask = (props) => {
    const [modalEstado, setmodalEstado] = useState(false)

    const [state, setState] = useState({
        nombre: "",
        color: "",
        cantidad: ""
    });
    const handleChangeText = (text, key) => {
        setState({ ...state, [key]: text });
    };
    const handlePressButton = () => {
        // Aquí se puede llamar a una función que utilize los valores de "state"
        editar(props.id, state.nombre, state.color, state.cantidad)
    };

    // arrow function editar productos
    const editar = async (idparam, nombre, color, cantidad) => {
        const response = await getDocs(collection(db, 'productos'))
        if (!response.empty) {
            response.forEach(document => {
                if (document.id == idparam) {
                    if (setDoc(doc(db, 'productos', idparam), {
                        nombre: nombre,
                        color: color,
                        cantidad: cantidad
                    })) {
                        Alert.alert('Campo editado');
                        setmodalEstado(false);
                        setState({nombre:"",color:"",cantidad:""})
                    }
                    else {
                        Alert.alert('Error al editar');
                    }
                }
            })
        }
    }
    return (
        <TouchableOpacity style={styles.cardView}
            onPress={() => eliminarProducto(props)}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.texto} >{"Nombre: "}
                    {props.nombre}</Text>
                <Text style={styles.texto} >{"Color: "}
                    {props.color}</Text>
                <Text style={styles.texto} >{"Cantidad: "}
                    {props.cantidad}</Text>
            </View>

            <Modal
                animationType='slide'
                onDismiss={() => console.log('close')}
                onShow={() => props}
                transparent
                visible={modalEstado}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(1,1,1,0.7)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        height: 420,
                        width: '90%',
                        backgroundColor: "#FFF",
                        borderRadius: 30

                    }}>
                        <View style={{
                            height: 45,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingHorizontal: 15,
                            backgroundColor: '#CCDDD3',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30
                        }}>

                            <Text style={{
                                fontSize: 30,
                                color: 'blue'
                            }}
                                onPress={() => {
                                    setmodalEstado(false)
                                }}>x</Text>
                        </View>
                        <View style={{
                            height: 45,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        >
                            <Text style={{
                                fontSize: 24,
                                color: 'black'
                            }}>Editar Producto</Text>




                        </View>
                        <View style={styles.contenedorinputs}>
                            <TextInput
                                placeholder="Nombre"
                                style={styles.inputs}
                                onChangeText={(text) => handleChangeText(text, "nombre")}
                                value={state.nombre}
                            />
                            <TextInput
                                placeholder="Color"
                                style={styles.inputs}
                                onChangeText={(text) => handleChangeText(text, "color")}
                                value={state.color}
                            />
                            <TextInput
                                placeholder="Cantidad"
                                style={styles.inputs}
                                onChangeText={(text) => handleChangeText(text, "cantidad")}
                                value={state.cantidad}
                            />
                            <View style={styles.botoninputs}>
                                <Button title='Editar Producto' color='#60935D' onPress={handlePressButton} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>

    )
    //Ventana emergente al hacer click sobre los itemTask
    function eliminarProducto(props) {
        Alert.alert(
            `Producto: ${props.nombre}`,
            "¿Que deseas hacer?",
            [{
                text: "Cancelar"
            },
            {
                text: "Editar", onPress: () => {
                    //navigation.navigate('CreateProduct')
                    setmodalEstado(true);
                }
            },
            {
                text: "Eliminar", onPress: () => {
                    eliminar(props.id)
                }
            }
            ]
        )
    }

};





// arrow function eliminar productos
const eliminar = async (idparam) => {
    const response = await getDocs(collection(db, 'productos'))
    if (!response.empty) {
        response.forEach(document => {
            if (document.id == idparam) {
                if (deleteDoc(doc(db, 'productos', document.id))) {
                    Alert.alert('Campo eliminado');
                }
                else {
                    Alert.alert('Error al eliminar');
                }

            }

        })
    }
}


const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        marginHorizontal: 8,
        marginVertical: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    texto: {
        fontSize: 22,
        textTransform: 'uppercase',
        color: 'black'
    },
    inputs: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: '80%',
        marginLeft: 35,
        marginTop: 20
    },
    botoninputs: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: '80%',
        marginLeft: 35,
        marginTop: 40
    },


});

export default ItemTask;
