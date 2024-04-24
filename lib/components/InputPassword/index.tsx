import { useState } from 'react';
import { InputGroup, InputRightElement, Button, Input } from '@chakra-ui/react';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';

export function InputPassword({ control, name, ...props }: {control: any, name:string, props:any}) {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup>
            <InputRightElement>
                <Button variant={'none'} size="sm" onClick={handleClick}>
                    {show ? <FaRegEye /> : <FaEyeSlash />}
                </Button>
            </InputRightElement>
            <Input {...props} name={name} ref={control.register} type={show ? 'text' : 'password'} />
        </InputGroup>
    );
}