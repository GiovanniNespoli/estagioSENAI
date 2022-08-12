import styled, { css } from "styled-components";

interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`

background: #232129;

border-radius: 10px;

max-width: 305px;
width: 100%;
padding: 3.5px 16px;

border: 2px solid #232129;

display: flex;
place-content: center;

margin-top: 8px;

${(props) => props.isFocused && css`
    color: red;
`}

    select {
        flex: 1;
        height: 3rem;

        background-color: #232129;
        border: none;

        border-radius: 10px;
        color: #666360;

        option {
            color: #fff;
        }
    }
`