import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Stack,
    Heading,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function SponsoredForm() {
    const [days, setDays] = useState<number>(0)
    return (
        <Stack>
                <Heading size={'sm'}>R$ {(days * 4.99).toFixed(2)}</Heading>
            <Slider colorScheme='primary' max={30} onChange={(val) => setDays(val)} aria-label='slider-ex-1' defaultValue={30}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderMark
                    value={days}
                    textAlign='center'
                    bg='primary.500'
                    color='white'
                    mt='5'
                    ml='-5'
                    w='20'
                >
                    {days} dias
                </SliderMark>
                <SliderThumb />
            </Slider>
        </Stack>
    )
}
