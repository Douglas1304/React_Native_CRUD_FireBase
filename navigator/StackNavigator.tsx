import React from "react";

import { createStackNavigator } from '@react-navigation/stack';

import CreateProduct from '../screens/CreateProduct';

import {ListProduct} from "../screens/ListProduct";

export type RootStackParamList = {
    CreateProduct: undefined;
    ShowProduct: undefined;
    ListProduct: undefined;
}

const RootStack = createStackNavigator<RootStackParamList>();
export const StackNavigator=()=>{
    return(
        <RootStack.Navigator initialRouteName="ListProduct">
            <RootStack.Screen name="ListProduct" options={{title:'Gestion de Productos'}} component={ListProduct}/>
            <RootStack.Screen name="CreateProduct" options={{title:'Crear Producto'}} component={CreateProduct}/>
        </RootStack.Navigator>
    );
};
