import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi"
import { useField } from "@unform/core"

import { Container, Error } from "./styles";
import ToolTip from "../../components/ToolTip"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);


    const { fieldName, defaultValue, error, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setIsFilled(!!inputRef.current?.value)
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)

    }, []);

    return (
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}      //Recebeu o foco
                onBlur={handleInputBlur}        //Perdeu o foco
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />

            {error && <Error title={error}> <FiAlertCircle color="#c53030"/> </Error>}
        </Container>
    )
};

export default Input