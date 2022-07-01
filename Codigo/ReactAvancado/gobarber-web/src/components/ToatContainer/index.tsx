import React from "react";

import { Container, Toast } from "./styles";
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

const ToastContainer: React.FC = () => {
    return (
        <Container>
            <Toast>
                <FiAlertCircle size={20}/>

                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possivel fazer login na aplicação</p>
                    <button type="button">
                        <FiXCircle size={18}/>
                    </button>
                </div>
            </Toast>

            <Toast type="sucess">
                <FiAlertCircle size={20}/>

                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possivel fazer login na aplicação</p>
                    <button type="button">
                        <FiXCircle size={18}/>
                    </button>
                </div>
            </Toast>

            <Toast type="error ">
                <FiAlertCircle size={20}/>

                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possivel fazer login na aplicação</p>
                    <button type="button">
                        <FiXCircle size={18}/>
                    </button>
                </div>
            </Toast>
        </Container>
    );
};

export default ToastContainer;