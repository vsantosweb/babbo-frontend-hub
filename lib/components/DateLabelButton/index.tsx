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
        <Styled.Datebox as={'button'}
            borderRadius={'2xl'}
            border={'solid 1px'}
            py={3}
            minWidth={'120px'}
            width={'120px'}
            height={'130px'}
            display={'flex'}
            alignItems={'center'}
            flexDir={'column'}
        >
            <Text>{weekDay}</Text>
            <Heading>{monthDay}</Heading>
            <Text>{month}</Text>
            <Text fontSize={'xs'}>{hour}</Text>
        </Styled.Datebox>
    )
}
