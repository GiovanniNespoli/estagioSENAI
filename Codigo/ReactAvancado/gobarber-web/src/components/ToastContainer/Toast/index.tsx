import React, { useEffect } from "react";

import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import { Container } from "./styles";
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
    message: ToastMessage;
    style: object;
};

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
    const { removeToast } = useToast();

    /**
     * similar ao componentDidMount e componentDidUpdate;
     * efeitos sem lipeza ou seja efeitos na dom da pag, podemos executar a ação e esquecer deles
     */
    useEffect(() => {
        //exclui o toast apos 3s
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        //se retornarmos uma função dentro do useEffect essa função
        //será automaticamente executada se o componente deixar de existir
        return () => {
            clearTimeout(timer);
        }
    }, [message.id, removeToast]);

    return (
        <Container
            type={message.type}
            hasDescription={!!message.description} /** !! == validação se existe uma description */
            style={style}
        >
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {message.description && /**  short index para fazer o if*/ <p>{message.description}</p>}
                <button type="button" onClick={() => removeToast(message.id)}>
                    <FiXCircle size={18} />
                </button>
            </div>
        </Container>
    );
};

export default Toast;