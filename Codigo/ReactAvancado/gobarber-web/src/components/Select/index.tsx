import { useField } from "@unform/core";
import React, { SelectHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { string } from "yup";

import { Container } from './style'

//importa as funções nativas do select
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string,
}

const Select: React.FC<SelectProps> = ({ name, children, ...rest }) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    const [isFocused, setFocused] = useState(false);

    const handleSelectFocus = useCallback(() => {
        setFocused(true);
    }, [])

    return (
        <Container isFocused={isFocused} >
            <select
                onFocus={handleSelectFocus}
                defaultValue={defaultValue}
                ref={selectRef}
                {...rest}>
                {children}
            </select>
        </Container>
    )
}

export default Select;