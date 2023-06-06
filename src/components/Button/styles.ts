import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface ContainerProps{
    type: 'salvarConfirmar'|'editar'|'remover'|'cancelar';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 40%;

    ${({ type }) => {
        let color;
        switch (type){
            case 'salvarConfirmar':
                color= '#008000'
                break;
            case 'editar':
                color= '#0F5298'
                break;
            case 'remover':
                color= '#FF0000'
                break;
            case 'cancelar':
                color= '#FFA700'
                break;
            default:
                color= '#008000'
                break;
        }
        return `background-color: ${color};`;
    }}

    border-radius: 5px;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: 14px;

    color: #FFF;

    padding: 18px;
`;