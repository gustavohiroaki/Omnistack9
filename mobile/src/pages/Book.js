import React, { useState } from 'react'
import { SafeAreaView, Text, Alert, TextInput, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native'

import api from '../services/api'

export default function Book({navigation}){
    const [date, setDate] = useState('')

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user')
console.log(date, user_id)
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada')

        navigation.navigate('List')
    }

    function handleCancel(){
        navigation.navigate('List')
    }

    const id = navigation.getParam('id')
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={text => setDate(text)}
            />

            
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button,styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        margin: 30,
        marginTop: 50
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 20
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2 
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },    
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }

})