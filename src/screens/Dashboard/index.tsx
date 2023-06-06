import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { 
    Container,
    Header,
    TextHeader,
    Text,
    EventWrapper,
    Img,
    EventContentWrapper,
    EventName,
    DHWrapper,
    EventDate,
    EventStartHour,
    EventDetails
} from './styles';
import { Input } from '../../components/Input';

import { Register } from '../Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Dashboard(){
    const [ evento, setEvento ] = useState([]);

    const route = useRoute();
    const listEvent = route.params?.listEvent; //faz com que receba os parâmetros

    // useEffect(() => {
    //     listEvent.getItem().then(evento => setEvento(evento));
    // }, [route]); //vai disparar toda vez que a rota for ativada

    useEffect(() =>{
        getEvents().then(evento => setEvento(evento));
    }, [route]); //vai disparar toda vez que a rota for ativada

    //pega todos os itens do asyncStorage e retorna em um array por uma promise
    function getEvents(){
        return AsyncStorage.getItem('items')
            .then(response =>{
                if (response)
                    return Promise.resolve(JSON.parse(response))
                else
                    return Promise.resolve([])
            });
    }

    return (
        <Container>
            <Header>
                <TextHeader>Eventos de caridade</TextHeader>
            </Header>

            <Input 
            placeholder='procurar um input de pesquisa'
            />

            <ScrollView>
                {
                evento.length > 0 ? (  
                evento.map((item) => (
                
                <EventWrapper key={item.id}>
                    <Img>
                        <Text>Imagem</Text>
                    </Img>

                    <EventContentWrapper>

                        <EventName>
                            <Text>{item.eventName}</Text>
                        </EventName>

                        <DHWrapper>

                            <EventDate> 
                                <Text>{item.eventDate}</Text>
                            </EventDate>

                            <EventStartHour>
                                <Text>{item.eventStart}</Text>
                            </EventStartHour>

                        </DHWrapper>

                        <EventDetails>
                            <Text>{item.eventDescription}</Text>
                        </EventDetails>

                    </EventContentWrapper>

                </EventWrapper>

                ))
            ) : (
                    <Text>Nenhum evento encontrado!</Text>
                )
            }
            </ScrollView>
        </Container>
    );
}