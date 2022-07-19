//Libraries
import React, { useRef, useCallback, useContext, useEffect } from "react";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link } from "react-router-dom"; //para fazer a navegação

import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErrors";

//Images
import logoImg from '../../assets/Logo.svg'

//Components
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background, AnimationContainer } from "./styles";

interface SignInFormData {
    email: string,
    password: string
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn, user } = useAuth();
    console.log(user);

    const { addToast } = useToast();

    const forceUpdate = useCallback(() => {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }, []);

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatoria'),
            });

            await schema.validate(data, { abortEarly: false });

            await signIn({
                email: data.email,
                password: data.password
            });

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                //@ts-ignore
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return
            }

            // disparar um toast
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorrou um erro ao fazer o login, cheque as credenciais',
            });

            console.log('aaa')
        }
    }, [signIn, addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Logo gobarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        <Button type="submit">Entrar</Button>

                        <a href="forgot">Esqueci a minha senha</a>
                    </Form>

                    <Link to="/signup" onClick={forceUpdate}>
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background></Background>
        </Container>
    );
}



export default SignIn;