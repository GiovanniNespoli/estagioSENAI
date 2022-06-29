import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: 0;
        outline: 0;
    }

    body{
        background: #312E38;
        color: #fff;
        -webkit-font-smoothing: antialised;
    }

    border-style, input, button {
        font-family: 'Roboto slab';
        font-size: 16px;
        font-weight: 500
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    button{
        cursor: pointer;
    }
`;