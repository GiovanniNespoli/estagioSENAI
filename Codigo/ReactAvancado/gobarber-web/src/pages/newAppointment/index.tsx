//Libraries
import React, { useRef, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FiScissors, FiCalendar } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import format from 'date-fns/format';

import { Container, Header, BackGround, Content } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

import Select from "../../components/Select";
import api from "../../services/api";
import User from '../../hooks';

interface IProviders {
    id: string,
    name: string,
}

interface CreateAppointmentData {
    selectProvider: string,
    data: string,
};

const NewAppointment: React.FC = () => {

    const [provider, setProvider] = useState<IProviders[]>([]);

    const handleCreateAppointment = useCallback(async (data: CreateAppointmentData) => {
        try {
            const schema = Yup.object().shape({
                provider_id: Yup.string().required('Selecione um barbeiro'),
                data: Yup.string().required('Selecione uma data'),
            });

            console.log(data);

            await api.post('/appointments/', data);
        } catch (error) {
            console.log('n foi')
        }
    }, []);

    // colocar os providers nas optioins
    useEffect(() => {
        api.get('providers/')
            .then(response => setProvider(response.data));
        console.log(provider);
    }, []);

    return (
        <>
            <Container>

                <Content>
                    <Header>
                        <FiScissors size={50} />
                        <span>Reserve seu agendamento</span>
                    </Header>

                    <Form onSubmit={handleCreateAppointment}>
                        <Select name="provider_id">
                            {
                                provider.map(providers => (
                                    <>
                                        <option selected disabled hidden>Selecione o barbeiro</option>
                                        <option key={providers.id} value={providers.id}>{providers.name}</option>
                                    </>
                                ))
                            }
                        </Select>
                        <Input icon={FiCalendar}
                            name="date"
                            type="datetime-local"
                        />
                        <Button type="submit">Reservar</Button>
                    </Form>
                </Content>

                <BackGround></BackGround>
            </Container>
        </>
    );
}



export default NewAppointment;