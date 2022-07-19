import styled, { keyframes } from "styled-components";
import { shade } from "polished"

import goBarberCadastro from '../../assets/goBarberCadastro.png'


export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    width: 100%;
    max-width: 700px;
`;

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px)
    } to {
        opacity: 1;
        transform: translateX(0px)
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    animation: ${appearFromRight} 1s;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;
        
        h1{
            margin-bottom: 24px;
        }

        
    a{
        color: #F4EDEB;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: 0.25s;

        &:hover{
            color: ${shade(0.2, '#f4EDEB')}
        }
    }
    }
    > a {
        color: #ff9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;

        display: flex;
        place-content: center;

        svg {
            margin-right: 16px
        }
    }
`;
export const Background = styled.div`
    flex: 1;
    background: url(${goBarberCadastro}) no-repeat center;
    background-size: cover;
`;