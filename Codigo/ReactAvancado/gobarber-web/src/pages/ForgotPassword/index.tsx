//Libraries
import React, { useRef, useCallback, useContext, useEffect } from "react";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom"; //para fazer a navegação

import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErrors";

//Images
import logoImg from '../../assets/Logo.svg'

//Components
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background, AnimationContainer } from "./styles";

interface ForgotPasswordFormData {
    email: string,
}

const ForgotPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const hisotry = useHistory();

    const { addToast } = useToast();

    const forceUpdate = useCallback(() => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }, []);

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            });

            await schema.validate(data, { abortEarly: false });


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
                title: 'Erro na recuperação de senha.',
                description: 'Ocorrou um erro ao fazer ao tentar recuperar a senha.',
            });
        }
    }, [addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Logo gobarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar senha</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Button type="submit" onClick={forceUpdate}>Recuperar</Button>
                    </Form>

                    <Link to="/" onClick={forceUpdate}>
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background></Background>
        </Container>
    );
}



export default ForgotPassword;