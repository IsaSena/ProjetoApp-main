import React, { useEffect, useState } from 'react';
import { Alert, Modal, View } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native';

import { 
    Container,
    Header,
    TextHeader,
    EventWrapper,
    SecondWrapper,
    Img,
    Text,
    EventDetailsWrapper,
    EventDate,
    EventStart,
    EventEnd,
    EventDetails,
    ButtonWrapper
} from './styles';
import { Button } from '../../components/Button';
import { EventDTO } from '../../dtos/EventDTO';
import { api } from '../../services/api';

 interface Params{
      evento : EventDTO;
  }

export function Details(){
     const [ modalVisible, setModalVisible ] = useState(false);
    
  const route = useRoute();
  const { evento } = route.params as Params || {}; 

 const navigation = useNavigation<any>();

    const handlePress = () =>{
     setModalVisible(true);
    };

     const closeModal = () => {
         setModalVisible(false);
     };

    //manda o evento pra editar
    async function handleEdit(evento : EventDTO){
        navigation.navigate('Novo', { evento });
    }

    async function handleConfirmRemove(){
        try{
            await api.delete(`/eventos/${evento.id}`);
            setModalVisible(false);
        }catch(error){
            console.log(error);
            Alert.alert("Não foi possível deletar o evento!")
        }
        navigation.navigate('Eventos');
    }

    return (
        <Container>
             <Header>
                <TextHeader>{evento.evento}</TextHeader>
            </Header>

            <EventWrapper>
                <SecondWrapper>
                    <Img>
                        <Text>{evento.imagem}</Text>
                    </Img>

                    <Modal 
                        visible={modalVisible} 
                        onRequestClose={closeModal}
                        transparent={true}
                    >
                        <View style={{
                            flex: 1, alignItems: 'center',justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 50
                            }}
                        >
                            <View style={{backgroundColor: '#FFF', padding: 20}}>
                                <Text>ATENÇÃO!{"\n"}</Text>
                                <Text>Confirma a exclusão do evento?</Text>
                                
                                <ButtonWrapper>
                                    <Button 
                                    title='Confirmar'
                                    type='salvarConfirmar'
                                    onPress={() => handleConfirmRemove()}
                                    />

                                    <Button 
                                    title='Cancelar'
                                    type='cancelar'
                                    onPress={closeModal}
                                    />
                                </ButtonWrapper>
                            </View>
                        </View>

                    </Modal>

                    <EventDetailsWrapper>

                        <EventDate>
                            <Text>Data : {evento.data}</Text>
                        </EventDate>

                        <EventStart>
                            <Text>Início: {evento.hora_inicio}</Text>
                        </EventStart>

                        <EventEnd>
                            <Text>Fim: {evento.hora_fim}</Text>
                        </EventEnd>

                    </EventDetailsWrapper>
                </SecondWrapper>

                <EventDetails>
                    <Text>{evento.detalhe}</Text>
                </EventDetails>
            </EventWrapper>

            <ButtonWrapper>
                <Button
                title='EDITAR'
                type='editar'
                onPress={() => handleEdit(evento)} 
                />

                <Button 
                title='REMOVER'
                type='remover'
                onPress={handlePress}
                />
            </ButtonWrapper>
        </Container>
    );
}