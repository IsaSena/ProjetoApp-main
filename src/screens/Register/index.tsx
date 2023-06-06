import React, { useState } from "react";

import { useNavigation, useRoute } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Container,
    Header,
    Text,
    TextHeader,
    HourWrapper,
    ButtonWrapper
} from './styles';

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Alert } from "react-native";

export function Register(){
    const [ eventName, setEventName ] = useState('');
    const [ eventDate, setEventDate ] = useState('');
    const [ eventStart, setEventStart ] = useState('');
    const [ eventEnd, setEventEnd ] = useState('');
    const [ eventDescription, setEventDescription ] = useState('');
    const [ eventImg, setEventImg ] = useState('');

    

    const navigation = useNavigation<any>();

    function handleChangeName(eventName : string){
        setEventName(eventName);
    }

    function handleChangeDate(eventDate : string){
        setEventDate(eventDate);
    }

    function handleChangeStart(eventStart : string){
        setEventStart(eventStart);
    }

    function handleChangeEnd(eventEnd : string){
        setEventEnd(eventEnd);
    }

    function handleChangeDescription(eventDescription : string){
        setEventDescription(eventDescription);
    }

    function handleChangeImg(eventImg : string){
        setEventImg(eventImg);
    }

    async function handleSave(){
        try{
            const listEvent = {id: new Date().getTime(), eventName, eventDate, eventStart, eventEnd, eventDescription, eventImg};
            let savedEvent = [];
            const response = await AsyncStorage.getItem('items');
            
            if (response) savedEvent = JSON.parse(response);
            savedEvent.push(listEvent);
            
            await AsyncStorage.setItem('items', JSON.stringify(savedEvent));
            navigation.navigate('Eventos', listEvent);
            console.log(listEvent);
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível salvar!')
        }
    };

    // async function saveData(eventName, eventDate, eventStart, eventEnd, eventDescription, eventImg) {
    //     try {
    //       await AsyncStorage.setItem(eventName, eventDate, eventStart, eventEnd, eventDescription, eventImg);
    //       console.log('Valor salvo com sucesso.');
    //     } catch (error) {
    //       console.log('Erro ao salvar o valor:', error);
    //     }
    //   }

    return (
        <Container>
            <Header>
                <TextHeader>Cadastrar / Alterar Evento</TextHeader>
            </Header>

            <Text>Evento</Text>
            <Input 
                onChangeText={handleChangeName}
            />

            <Text>Data</Text>
            <Input 
                keyboardType="numeric"
                onChangeText={handleChangeDate}
            />

            <HourWrapper>
                <Text>Hora de início</Text>
                <Input 
                    style={{width: '40%'}}
                    keyboardType="numeric"
                    onChangeText={handleChangeStart}
                />

                <Text>Hora de finalização</Text>
                <Input 
                    style={{width: '40%'}}
                    keyboardType="numeric"
                    onChangeText={handleChangeEnd}
                />
            </HourWrapper>

            <Text>Descrição</Text>
            <Input 
                style={{height: '15%'}}
                onChangeText={handleChangeDescription}
            />
            <Text>Imagem de divulgação</Text>

            <ButtonWrapper>
                <Button 
                title='SALVAR'
                type='salvarConfirmar'
                onPress={handleSave}
                />
            </ButtonWrapper>
        </Container>
    );
}