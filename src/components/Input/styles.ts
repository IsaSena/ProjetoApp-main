import styled from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled(TextInput)` /*sem isso daria erro de tipagem*/
    width: 100%;
    padding: 16px 18px; /*da letra com o input*/

    font-size: 14px;
    color: #000; /*cor ao ser escrito*/

    background-color: #FFF;
    border-radius: 8px;

    margin-bottom: 8px;
`;