import styled from "styled-components";
import { shade } from "polished"

import goBarberLogin from '../../assets/goBarberLogin.png'


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

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;
        
        h1{
            margin-bottom: 24px;
        }

        

        

        button{
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
    background: url(${goBarberLogin}) no-repeat center;
    background-size: cover;
`;