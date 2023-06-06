import React, { useState } from 'react';
import { Modal, View } from 'react-native'

import { useNavigation } from '@react-navigation/native';

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

export function Details(){
    const [ modalVisible, setModalVisible ] = useState(false);
    
    const navigation = useNavigation<any>();

    const handlePress = () =>{
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    function handleEdit(){
        navigation.navigate('Novo');
    }

    function handleConfirmRemove(){
        navigation.navigate('Eventos');
    }

    return (
        <Container>
            <Header>
                <TextHeader>Doação</TextHeader>
            </Header>

            <EventWrapper>
                <SecondWrapper>
                    <Img>
                        <Text>Imagem</Text>
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
                                    onPress={handleConfirmRemove}
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
                            <Text>Data: 06/06/2023</Text>
                        </EventDate>

                        <EventStart>
                            <Text>Início: 08:00</Text>
                        </EventStart>

                        <EventEnd>
                            <Text>Fim: 22:00</Text>
                        </EventEnd>

                    </EventDetailsWrapper>
                </SecondWrapper>

                <EventDetails>
                    <Text>Evento de doação de roupas para pessoas necessitadas.</Text>
                </EventDetails>
            </EventWrapper>

            <ButtonWrapper>
                <Button
                title='EDITAR'
                type='editar'
                onPress={handleEdit} 
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