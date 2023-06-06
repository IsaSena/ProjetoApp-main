import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

import { api} from '../../services/api';
import { EventDTO } from '../../dtos/EventDTO'

export function Dashboard(){
    const [ evento, setEvento ] = useState<EventDTO[]>([]);
    const [ loading, setLoading ] = useState(true);
    const navigation = useNavigation<any>();

    // const route = useRoute();
    // const listEvent = route.params?.listEvent; //faz com que receba os parâmetros

//busca no async  e atualiza os eventos
    // useEffect(() =>{
    //     getEvents().then(evento => setEvento(evento));
    // }, [route]); //vai disparar toda vez que a rota for ativada e seta o evento

    // //pega todos os itens do asyncStorage e retorna em um array por uma promise
    // function getEvents(){
    //     return AsyncStorage.getItem('items')
    //         .then(response =>{
    //             if (response)
    //                 return Promise.resolve(JSON.parse(response))
    //             else
    //                 return Promise.resolve([])
    //         });
    // }

    useEffect(() =>{
        async function fetchEvents(){
            try{
                const resposta = await api.get('/eventos');
                setEvento(resposta.data);
            }catch (error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchEvents();
    },[]);

    function handleEventDetails(){
        navigation.navigate('Detalhes');
    }

    return (
        <Container>
            <Header>
                <TextHeader>Eventos de caridade</TextHeader>
            </Header>

            <Input 
            placeholder='procurar um input de pesquisa'
            />
            <ScrollView
            >
            {
                evento.map((evento) => (
                <TouchableOpacity
                onPress={() => handleEventDetails()}
                >
                
                <EventWrapper 
                    key={evento.idevento}
                >
                    <Img>
                        <Text>Imagem</Text>
                    </Img>

                    <EventContentWrapper>

                        <EventName>
                            <Text>{evento.evento}</Text>
                        </EventName>

                        <DHWrapper>

                            <EventDate> 
                                <Text>{evento.data}</Text>
                            </EventDate>

                            <EventStartHour>
                                <Text>{evento.hora_inicio}</Text>
                            </EventStartHour>

                        </DHWrapper>

                        <EventDetails>
                            <Text>{evento.detalhe}</Text>
                        </EventDetails>

                    </EventContentWrapper>

                </EventWrapper>
                </TouchableOpacity>
                ))
            }

            </ScrollView>
        </Container>
    );
}