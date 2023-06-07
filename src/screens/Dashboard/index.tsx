import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

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

    const navigation = useNavigation<any>();

//    useEffect(() =>{
        async function fetchEvents(){
            try{
                const resposta = await api.get('/eventos');
                setEvento(resposta.data);
            }catch (error){
                console.log(error);
            }
        }
     //   fetchEvents();
    //},[]);

     useEffect(() =>{
         fetchEvents();
     },[]);

     useFocusEffect(useCallback(()=> {
         fetchEvents();
     },[]));

    //passa pra rota o evento //ok
    function handleEventDetails(evento : EventDTO ){ 
        navigation.navigate('Detalhes', { evento });
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
                onPress={() => handleEventDetails(evento)}
                >
                
                <EventWrapper 
                    key={evento.id}
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