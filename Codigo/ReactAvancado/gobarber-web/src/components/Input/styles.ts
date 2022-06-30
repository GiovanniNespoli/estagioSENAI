import styled, { css } from "styled-components";

import ToolTip from '../ToolTip'; 

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    
    background: #232129;

    border-radius: 10px;

    max-width: 305px;
    width: 100%;
    padding: 16px;

    border: 2px solid #232129;
    color: #666360;

    display: flex;
    place-content: center;

    margin-top: 8px;

    ${(props) => props.isErrored && css`
        color: #c53030;
        border-color: #c53030;
    `}

    ${(props) => props.isFocused && css`
        color: #ff9000;
        border-color: #ff9000;
    `}

    ${(props) => props.isFilled && css`
        color: #ff9000;
    `}

    input{

        flex: 1;
        border: 0;
        background: transparent;

        padding: 0 16px; 

        color: #F4EDEB;
        
        & + input {
            margin-top: 8px;
        }

        &&::placeholder{
            color: #666360;
        }

    }
`;

export const Error = styled(ToolTip)`
`;
