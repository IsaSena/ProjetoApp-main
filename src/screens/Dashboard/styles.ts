import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #D3D3D3;
`;

export const Header = styled.View`
    align-items: center;
    padding-top: 50px;
    padding-bottom: 40px;
    font-size: 20px;
`;

export const TextHeader = styled.Text`
    font-size: 30px;
`;

export const Text = styled.Text`
    font-size: 16px;
`;

export const EventWrapper = styled.View`
    background-color: #FFF;
    border: 0.3px solid #000;
    flex-direction: row;
    align-items: center;
    align-content: space-between;
`;

export const Img = styled.View`
    margin-left: 5px;
`;

export const EventContentWrapper = styled.View`
    margin-left: 10px;
`;

export const EventName = styled.View`

`;

export const DHWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const EventDate = styled.View`

`;

export const EventStartHour = styled.View`

`;

export const EventDetails = styled.View`

`;

// export const Lista = styled(FlatList).attrs({
//     showVerticalScrollIndicator: true,
//   })`
//     width: 90%;
//     margin-top: 40px;
//     height: 100%;
//   ` as React.ComponentType as new <DataListProps>() => FlatList<DataListProps>;
