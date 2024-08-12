import { Box, Heading, Text } from "@chakra-ui/react";
import * as Styled from './styles';
import moment from "moment";

export function DateLabelButton({ date }: { date: string }) {

    // Defina a data inicial
    const data = moment(date);

    // Extraia os componentes da data
    const weekDay = data.format('ddd'); // Dia da semana abreviado (ex: sab)
    const monthDay = data.format('D'); // Dia do mês (ex: 27)
    const month = data.format('MMMM'); // Mês completo (ex: abril)
    const hour = data.format('HH[h]'); // Hora no formato 24 horas (ex: 17h)

    return (
        <Styled.Datebox>
            <Styled.DateBoxText>{weekDay}</Styled.DateBoxText>
            <Styled.DateBoxTitle>{monthDay}</Styled.DateBoxTitle>
            <Styled.DateBoxText>{month}</Styled.DateBoxText>
            <Styled.DateBoxText>{hour}</Styled.DateBoxText>
        </Styled.Datebox>
    )
}
