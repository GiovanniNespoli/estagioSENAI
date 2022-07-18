import React from "react";

import { Container, Toast } from "./styles";
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../hooks/toast';

interface ToastContainerProps {
    messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const { removeToast } = useToast();

    return (
        <Container>
            {messages.map(message => (

                <Toast key={message.id} type={message.type} hasDescription={!!message.description}>
                    <FiAlertCircle size={20} />

                    <div>
                        <strong>{message.title}</strong>
                        {message.description && /**  short index para fazer o if*/ <p>{message.description}</p>}
                        <button type="button" onClick={() => removeToast(message.id)}>
                            <FiXCircle size={18} />
                        </button>
                    </div>
                </Toast>
            ))}
        </Container>
    );
};

export default ToastContainer;