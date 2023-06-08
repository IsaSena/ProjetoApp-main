import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'


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
import { EventDTO } from "../../dtos/EventDTO";
import { api } from "../../services/api";
import moment from "moment";
import { InputForm } from "../../components/InputForm";

interface Params{
    evento : EventDTO;
}

export function Register(){
    const route = useRoute();
    const { evento } = route.params as Params || {};

    const [ e, setEvento ] = useState('');
    const [ data, setData ] = useState('');
    const [ hora_inicio, setHora_Inicio ] = useState('');
    const [ hora_fim, setHora_Fim ] = useState('');
    const [ detalhe, setDetalhe ] = useState('');
    const [ imagem, setImagem ] = useState('');

    const navigation = useNavigation<any>();

    async function handleSave(){

        if(e == ''){
            Alert.alert('O nome do evento é obrigatório!')
        }else if(data == ''){
            Alert.alert('A data do evento é obrigatória!')
        }else if(moment(data, 'MM/DD/YYYY',true).isValid() == false){
            Alert.alert('Data invalida')
        }else if(hora_inicio == ''){
            Alert.alert('O horário de início é obrigatório!')
            
        }else if(moment(hora_inicio, 'HH:mm',true).isValid() == false){
            Alert.alert('Hora de início inválida!')
        }else if (hora_fim == ''){
            Alert.alert('O horário de fim é obrigatório!')
        }else if(moment(hora_fim, 'HH:mm',true).isValid() == false){
            Alert.alert('Hora de fim inválida!')
        }else if (detalhe == ''){
            Alert.alert('Os detalhes do evento é obrigatório!')
        } else if (evento != null) {
            if(e === ''){
                Alert.alert('O nome do evento é obrigatório!')
            }else if(data === '' ){
                Alert.alert('A data do evento é obrigatória!')
            }else if(moment(data, 'MM/DD/YYYY',true).isValid() == false){
                Alert.alert('Data invalida')
            }else if(hora_inicio === ''){
                Alert.alert('O horário de início é obrigatório!')
            }else if(moment(hora_inicio, 'HH:mm',true).isValid() == false){
                Alert.alert('Hora de início inválida!')
            }else if (hora_fim === ''){
                Alert.alert('O horário de fim é obrigatório!')
            }else if(moment(hora_fim, 'HH:mm',true).isValid() == false){
                Alert.alert('Hora de fim inválida!')
            }else if (detalhe === ''){
                Alert.alert('Os detalhes do evento é obrigatório!')
            }
            else{
                try {
                    await api.put(`/eventos/${evento.id}`, {evento : e, data, hora_inicio, hora_fim, detalhe});
                } catch (e) {
                    console.error(e);
                    Alert.alert('Não foi possível salvar!')
                } finally {
                    navigation.navigate('Eventos');
                }
            }
            navigation.navigate('Eventos');
        } else {
            await api.post('/eventos', {evento : e, data, hora_inicio, hora_fim, detalhe});
            navigation.navigate('Eventos');
        }
     }
        
    return (
        
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header>
                    <TextHeader>Cadastrar / Alterar Evento</TextHeader>
                </Header>

                <Text>Evento</Text>
                <Input
                    defaultValue={evento ? evento.evento : ''}
                    onChangeText={setEvento}
                />

                <Text>Data</Text>
                <Input 
                    defaultValue={evento ? evento.data : ''}
                    onChangeText={setData}
                    maxLength={10}
                    
                />

                <HourWrapper>
                    <Text>Hora de início</Text>
                    <Input 
                        defaultValue={evento ? evento.hora_inicio : ''}
                        style={{width: '40%'}}
                        onChangeText={setHora_Inicio}
                        maxLength={5}
                    />

                    <Text>Hora de finalização</Text>
                    <Input 
                        defaultValue={evento ? evento.hora_fim : ''}
                        style={{width: '40%'}}
                        onChangeText={setHora_Fim}
                        maxLength={5}
                    />
                </HourWrapper>

                <Text>Descrição</Text>
                <Input 
                    defaultValue={evento ? evento.detalhe : ''}
                    style={{height: '15%'}}
                    onChangeText={setDetalhe}
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
        </TouchableWithoutFeedback>
    );
}