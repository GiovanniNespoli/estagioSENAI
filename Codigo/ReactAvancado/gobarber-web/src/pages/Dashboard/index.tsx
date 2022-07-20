import React from "react";
import { FiPower } from "react-icons/fi";

import { Container, Header, HeaderContent, Profile } from "./styles";
import { useAuth } from "../../hooks/auth";

import logoImg from '../../assets/Logo.svg';
import perfil from '../../assets/gigio.png';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    console.log(user)

    return (
        <Container>
        <Header>
            <HeaderContent>
                <img src={logoImg} alt="GoBarber" />

                <Profile>
                    <img src={perfil} alt="Imagem de Perfil" />
                    <div>
                        <span>Bem vindo,</span>
                        <strong>Giovanni Nespolindo</strong>
                    </div>
                </Profile>

                <button type="button" onClick={signOut}>
                    <FiPower></FiPower>
                </button>
            </HeaderContent>
        </Header>
    </Container>
    );
};

export default Dashboard