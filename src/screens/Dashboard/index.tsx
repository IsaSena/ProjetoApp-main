import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
    EventDetails,
//    Lista
} from './styles';

import { Input } from '../../components/Input';

import { api} from '../../services/api';
import { EventDTO } from '../../dtos/EventDTO'

export function Dashboard(){
    const [ evento, setEvento ] = useState<EventDTO[]>([]);
    const [ eventosFiltrados, setEventosFiltrados ] = useState<EventDTO[]>([]); // Estado para armazenar a lista de eventos filtrados
    const [ palavraPesquisa, setPalavraPesquisa ] = useState(""); //Estado para armazenar o termo de pesquisa

    const navigation = useNavigation<any>();

        async function fetchEvents(){
            try{
                const resposta = await api.get('/eventos');
                setEvento(resposta.data);
            }catch (error){
                console.log(error);
            }
        }

        const filtrarEventos = useCallback(() => {
            let eventosFiltrados;
            const palavra = palavraPesquisa.toLowerCase();
            if(palavra === ''){
                setEventosFiltrados(evento)
            }else{
                eventosFiltrados = evento.filter((event) => {
                    const { evento, data } = event;
                    return (
                      (evento && evento.toLowerCase().includes(palavra)) ||
                      (data && data.includes(palavra))
                    );
                  });
                  console.log(eventosFiltrados)
                  setEventosFiltrados(eventosFiltrados);
            }
          }, [palavraPesquisa]);

     useEffect(() =>{
        // fetchEvents();
         filtrarEventos();
     },[filtrarEventos]);

     useFocusEffect(useCallback(()=> {
         fetchEvents();
     },[]));

    //passa pra rota o evento 
    function handleEventDetails(evento : EventDTO ){ 
        navigation.navigate('Detalhes', { evento });
    }

    return (
        <Container>
            <Header>
                <TextHeader>Eventos de caridade</TextHeader>
            </Header>

            <Input 
            placeholder='Digite para procurar...'
            onChangeText={setPalavraPesquisa}
            />

            <ScrollView
            >
            <FlatList data={eventosFiltrados} renderItem={({item})=>
            
                <TouchableOpacity
                onPress={() => handleEventDetails(item)}
                >
                
                <EventWrapper 
                    key={item.id}
                >
                    <Img>
                        <Text>Imagem</Text>
                    </Img>

                    <EventContentWrapper>

                        <EventName>
                            <Text>{item.evento}</Text>
                        </EventName>

                        <DHWrapper>

                            <EventDate> 
                                <Text>{item.data}</Text>
                            </EventDate>

                            <EventStartHour>
                                <Text>{item.hora_inicio}</Text>
                            </EventStartHour>

                        </DHWrapper>

                        <EventDetails>
                            <Text>{item.detalhe}</Text>
                        </EventDetails>

                    </EventContentWrapper>

                </EventWrapper>
                </TouchableOpacity>}/>
                

            </ScrollView>
        </Container>
    );
}