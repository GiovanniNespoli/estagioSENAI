import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`

    background: #ff9000;

    height: 56px;
    width: 100%;
    padding: 0 16px;
    margin-top: 16px;

    border-radius: 10px;
    border: 0;

    color: #312e38;
    font-weight: 500;

    transition: 0.25s;   


    &:hover{
        background: ${shade(0.2, '#ff9000')};
    }

    &:active{
        transform: translateY(-6px);
    }

`;