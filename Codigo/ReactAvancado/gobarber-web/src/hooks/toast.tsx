import React, { createContext, useContext, useCallback, useState } from "react";
import ToastContainer from '../components/ToastContainer';
import { v4 as uuid } from 'uuid';

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

//tipo do toast
export interface ToastMessage {
    id: string,
    type?: 'success' | 'error' | 'info',
    title: string,
    description?: string,
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    //melhor lugar para salvar qualquer tipo de informação é o estado da página
    //criaremos um estado para salvar a mensagem do toast
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    /**
     * OMIT -> usado para definir a tipagem, ou seja terá todas as tipagens de tal interface menos a passada em ''
     * usamos uuid em um toast já que podemos ter mais de um toast aparecendo na pag
     */
    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuid();

        const toast = {
            id,
            type,
            title,
            description
        };

        /*  
            outra forma de preencher o array n quebrando o conceito de imutabilidade,
            quando passamos uma função no setMessages ele vai retornar os valores antigos
        */
        setMessages((state) => [...state, toast]);
    },
        [],
    );

    //para removermos temos q pegar o id para deletar 
    const removeToast = useCallback((id: string) => {
        //retorna as mensagens armazenadas no estados porém só as que forem diferentes da passada 
        setMessages(state => state.filter(message => message.id !== id))
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('userToast must be used within a toastProvider');
    }

    return context;
};

export { ToastProvider, useToast }