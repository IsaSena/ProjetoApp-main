import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import {
    Container
} from './styles';

import { Input } from '../Input';

interface Props extends TextInputProps{
    control: Control;
    name: string;
}

//controla os inputs, envia de uma vez
//render fala qual input vai ser renderizado

export function InputForm({
    control,
    name,
    ...rest
} : Props ){
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: {onChange, value}}) =>(
                    <Input 
                    onChangeText={onChange}
                    value={value}
                    {...rest}
                    
                    />
                )}
                name={name}
            />
        </Container>
    )
}