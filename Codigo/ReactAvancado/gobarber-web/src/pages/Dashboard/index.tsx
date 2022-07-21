import React from "react";
import { FiPower } from "react-icons/fi";

import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar } from "./styles";
import { useAuth } from "../../hooks/auth";

import logoImg from '../../assets/Logo.svg';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    console.log(user);
    console.log(user.avatar);

    return (
        <Container>
        <Header>
            <HeaderContent>
                <img src={logoImg} alt="GoBarber" />

                <Profile>
                    <img src={user.avatar} alt="Imagem de Perfil" />
                    <div>
                        <span>Bem vindo,</span>
                        <strong>{user.name}</strong>
                    </div>
                </Profile>

                <button type="button" onClick={signOut}>
                    <FiPower></FiPower>
                </button>
            </HeaderContent>
        </Header>

        <Content>
            <Schedule></Schedule>
            {/* <Calenar/> */}
        </Content>
    </Container>
    );
};

export default Dashboard