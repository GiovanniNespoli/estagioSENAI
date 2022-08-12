//Libraries
import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from 'yup' //validação dos campos
import { Link, useHistory } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";

//Images
import logoImg from '../../assets/Logo.svg'

//Components
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer, Background } from "./styles";

interface SignUpFormData {
    name: string,
    email: string,
    password: string,
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const forceUpdate = useCallback(() => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }, []);

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo com 6 dígitos'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/users', data); 
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro Realizado.',
                description: 'Você já pode fazer o logon no GoBarber!',
            })

        } catch (err) {

            //@ts-ignore
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
            });
        }
    }, []);


    return (
        <Container>

            <Background></Background>

            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Logo gobarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu Cadastro</h1>

                        <Input name="name" icon={FiUser} placeholder="Nome" />
                        <Input name="email" icon={FiMail} type="email" placeholder="E-Mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        <Button type="submit" onClick={forceUpdate}>Cadastrar</Button>

                    </Form>

                    <Link to="/" onClick={forceUpdate}>
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>

                </AnimationContainer>
            </Content>

        </Container>
    )
};

export default SignUp;