import styled from "styled-components";

export const Container = styled.div`
    
    background: #232129;

    border-radius: 10px;
    border: 2px solid #232129;

    max-width: 305px;
    width: 100%;
    padding: 16px;

    color: #F4EDEB;

    display: flex;
    place-content: center;
    
    input{

        flex: 1;
        border: 0;
        background: transparent;

        padding: 0 16px; 

        color: #F4EDEB;
        
        & + input {
            margin-top: 8px;
        }

        svg {
            margin-right: 16px;
        }

    }
`;