import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isToday, format } from 'date-fns';
import ptBR from "date-fns/esm/locale/pt-BR";
import { FiClock, FiPower } from "react-icons/fi";
import DayPicker, { DayModifiers } from "react-day-picker";
import 'react-day-picker/lib/style.css';

import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    Calendar,
    NextAppointment,
    Section,
    Appointment
} from "./styles";
import { useAuth } from "../../hooks/auth";

import logoImg from '../../assets/Logo.svg';
import userImg from '../../assets/gigio.png';
import api from "../../services/api";

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    //armazenar o mes atual
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
    //Mudar quando o usuario seleciona uma data
    // useCallBack -> retorna uma função
    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    //useEffect -> Dispara uma ação toda vez q uma ou mais variaveis mudarem, executa a função
    useEffect(() => {
        api.get(`providers/${user.id}/month-availability`, {
            params: {
                month: currentMonth.getMonth() + 1,
                year: currentMonth.getFullYear(),
            },
        },
        ).then(response => {
            setMonthAvailability(response.data);
            console.log(response.data);

        });
    }, [currentMonth, user.id]);


    useEffect(() => {
        api.get('')
    },[selectedDate])

    //useMemo -> memoriza um valor específico e 
    //dizemos pra ele quando o valor deve ser recarregado
    // retorna um valor
    const disableDays = useMemo(() => {
        const dates = monthAvailability
            .filter((monthDay) => monthDay.available === false)
            .map((monthDay) => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();

                return new Date(year, month, monthDay.day);
            });

        return dates;
    }, [currentMonth, monthAvailability]);

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR })
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', { locale: ptBR});
    }, [selectedDate])

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatar} alt="Imagem de Perfil" />
                        <div>
                            <span>Bem vindo,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower></FiPower>
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        <span>{isToday(selectedDate) && 'Hoje'}</span>
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>

                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src={userImg} alt="Gigio" />

                            <strong>Giovanni Nespolindo</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointment>

                    <Section>
                        <strong>Manhã</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src={userImg} alt="Gigio" />

                                <strong>Giovanni Nespolindo</strong>
                            </div>
                        </Appointment>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src={userImg} alt="Gigio" />

                                <strong>Giovanni Nespolindo</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src={userImg} alt="Gigio" />

                                <strong>Giovanni Nespolindo</strong>
                            </div>
                        </Appointment>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src={userImg} alt="Gigio" />

                                <strong>Giovanni Nespolindo</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[
                            { daysOfWeek: [0, 6] }, ...disableDays
                        ]}
                        onDayClick={handleDateChange}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5,] } }}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                    />
                </Calendar>
            </Content>

        </Container>
    );
};

export default Dashboard