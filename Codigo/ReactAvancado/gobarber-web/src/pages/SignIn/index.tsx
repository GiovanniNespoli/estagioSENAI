//Libraries
import React from "react";
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi'

//Images
import logoImg from '../../assets/Logo.svg'

//Components
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background } from "./styles";

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Logo gobarber" />

            <form>
                <h1>Faça seu logon</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci a minha senha</a>
            </form>

            <a href="">
                <FiLogIn />
                Criar conta
            </a>
        </Content>
        <Background></Background>
    </Container>
);

export default SignIn;