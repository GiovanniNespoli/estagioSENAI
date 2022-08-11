//Libraries
import React, { useRef, useCallback, useContext, useEffect } from "react";
import { FiScissors } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Header, BackGround, Content } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

import bannerImg from '../../assets/goBarberCadastro.png';

const newAppointment: React.FC = () => {
    return (
        <>
            <Container>

                <Content>
                    <Header>
                        <span>Reserve seu agendamento</span>
                        <FiScissors size={50} />
                    </Header>

                    <Form onSubmit={() => console.log('boa')}>
                        <Button>Reservar</Button>
                    </Form>
                </Content>

                <BackGround></BackGround>
            </Container>
        </>
    );
}



export default newAppointment;