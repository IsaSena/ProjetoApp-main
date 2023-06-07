import React, { useState } from "react";

import { useNavigation, useRoute } from '@react-navigation/native';

import * as Yup from 'yup';

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
    const [ evento, setEvento ] = useState('');
    const [ data, setData ] = useState('');
    const [ hora_inicio, setHora_Inicio ] = useState('');
    const [ hora_fim, setHora_Fim ] = useState('');
    const [ detalhe, setDetalhe ] = useState('');
    const [ imagem, setImagem ] = useState('');
    var id = Number;
    // const route = useRoute();
    // const { evento } = route.params as Params;

    const schema = Yup.object().shape({
        evento: Yup.string().required('O nome do evento é obrigatório!'),
        data: Yup.string().required('A data do evento é obrigatória!'),
        hora_inicio: Yup.string().required('O horário de início do evento é obrigatório!'),
        hora_fim: Yup.string().required('O horário do fim do evento é obrigatório'),
        detalhe: Yup.string().required('A descrição do evento é obrigatória!')
    })

    // const{
    //     control, /*registra os inputs*/
    //     handleSubmit, /*pega os valores de todos os inputs e envia 1 vez só*/
    //     reset,
    //     formState:{ errors }
    // } = useForm({
    //     resolver : yupResolver(schema)/*faz com que o form siga um padrao criado*/
    // })

    const navigation = useNavigation<any>();

    function handleChangeName(evento : string){
        setEvento(evento);
    }

    function handleChangeDate(data : string){
        setData(data);
    }

    function handleChangeStart(hora_inicio : string){
        setHora_Inicio(hora_inicio);
    }

    function handleChangeEnd(hora_fim : string){
        setHora_Fim(hora_fim);
    }

    function handleChangeDescription(detalhe : string){
        setDetalhe(detalhe);
    }

    function handleChangeImg(imagem : string){
        setImagem(imagem);
    }

    const completeEvent = {
        id,
        evento,
        data,
        hora_inicio,
        hora_fim,
        detalhe,
        imagem
    };


    async function handleSave(){
        try {
            await api.post('/eventos', completeEvent);
            console.log(completeEvent);
        } catch (e) {
            console.error(e);
            Alert.alert('Não foi possível salvar!')
        } finally {
            navigation.navigate('Eventos');
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