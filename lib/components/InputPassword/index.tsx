import { Button, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

export default function InputPassword() {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    
    return (
        <InputRightElement width="4.5rem">
            <Button size="sm" onClick={handleClick}>
                {show ? <FaRegEye /> : <FaEyeSlash />}
            </Button>
        </InputRightElement>
    )
}
