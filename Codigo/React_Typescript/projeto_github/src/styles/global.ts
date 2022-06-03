import { createGlobalStyle } from "styled-components";

import imgGit from '../assets/github-background.svg';

export default createGlobalStyle`
    *{
        margin : 0;
        padding : 0;
        outline : 0;
        box-sizing : 0;
    }

    body{
        background : #F0F0F5 url(${imgGit}) no-repeat 70% top;
        -webkit-font-smothing: antialiased;
    }

    body, input, button{
        font: 16px Roboto
    }

    button {
        cursor : pointer;
    }

    #root {
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }
` 