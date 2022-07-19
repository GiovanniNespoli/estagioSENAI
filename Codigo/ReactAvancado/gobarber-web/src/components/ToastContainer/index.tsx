import React from "react";
import { useTransition } from "react-spring";

import { Container } from "./styles";
import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';

interface ToastContainerProps {
    messages: ToastMessage[];
};

//informações dos toast e como eles aparecem na tela
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    /**
     * 1º parametro -> as mensagens 
     * 2º parametro -> uma função que vai obter a chave da minha mensagem
     * 3º parametro -> objeto contendo as minhas animações 
     */
    const messagesWithTransitions = useTransition(messages, {
        
        keys: (message) => message.id,
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
    })

    return (
        <Container>
            {messagesWithTransitions((style, item) => (
                <Toast style={style} key={item.id} message={item} />
            ))}
        </Container>
    );
};

export default ToastContainer;