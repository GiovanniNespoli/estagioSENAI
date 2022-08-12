import styled, { keyframes } from "styled-components";
import { shade } from "polished"

import goBarberCadastro from '../../assets/goBarberCadastro.png';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: stretch;
    justify-content: space-between;

`;

export const Content = styled.div`
    width: 100%;
    max-width: 700px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    Form {
        width: 50%;
        height: auto;
        display: flex;
        flex-direction: column;

        Input {
            color: #686868;
        }

        Button {
            width: 340px;
        }
    }
`

export const Header = styled.div`

    margin-bottom: 50px;
    display: flex;
    align-items: center;

    span {
        font-size: 30px;
        font-weight: bold;
    }

    svg {
        margin-right: 10px;
    }

`

export const BackGround = styled.div`
    flex: 1;
    background: url(${goBarberCadastro}) no-repeat center;
    background-size: cover;

`