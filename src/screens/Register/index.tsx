import React, { useState } from "react";

import { useNavigation, useRoute } from '@react-navigation/native';

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
import { EventDTO } from "../../dtos/EventDTO";
import { api } from "../../services/api";

// interface Params{
//     evento : EventDTO;
// }

export function Register(){
    const [ eventName, setEventName ] = useState('');
    const [ eventDate, setEventDate ] = useState('');
    const [ eventStart, setEventStart ] = useState('');
    const [ eventEnd, setEventEnd ] = useState('');
    const [ eventDescription, setEventDescription ] = useState('');
    const [ eventImg, setEventImg ] = useState('');

    // const route = useRoute();
    // const { evento } = route.params as Params;

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

    const completeEvent = {
             eventName,
             eventDate,
             eventStart,
             eventEnd,
             eventDescription,
             eventImg
             };


    async function handleSave(){
        
        let notification = JSON.stringify({
            token: 1
        })

let res = null;
try {
    const c = await api.get('/eventos');
    console.log(c.data);
    res = await api.post('/eventos', c.data);
} catch (e) {
    console.error(res);
} finally {
    //navigation.navigate('Eventos');
}

        
        

    }

    // async function handleSave(){
    //     try{
    //         const completeEvent = {
    //             id : 'string',
    //             eventName,
    //             eventDate,
    //             eventStart,
    //             eventEnd,
    //             eventDescription,
    //             eventImg
    //         };
    //         const resposta = await api.post('/eventos', completeEvent);
    //         console.log(resposta.data);
    //         navigation.navigate('Eventos');
    //     }catch(error){
    //         console.log(error);
    //         Alert.alert('Não foi possível salvar!')
    //     }
    // }

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