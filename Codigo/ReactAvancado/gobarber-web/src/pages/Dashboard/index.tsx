
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format, isAfter, isToday, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    NextAppointment,
    Calendar,
    Section,
    Appointment,
    CreateAppointment,
} from './styles';
import { useAuth } from '../../hooks/auth';
import LogoImg from '../../assets/Logo.svg';
import api from '../../services/api';

interface MonthAvailability {
    day: number;
    available: boolean;
}

type Appointments = Array<{
    id: string;
    date: string;
    formattedHour: string;
    user: {
        name: string;
        avatar_url: string;
    },
    provider: {
        name: string,
        avatar_url: string,
    },
}>;

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<
        MonthAvailability[]
    >([]);
    const [appointments, setAppointments] = useState<Appointments>([]);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    const navigationToCreate = useCallback(() => {
        
    }, []);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter(monthDay => monthDay.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();

                return new Date(year, month, monthDay.day);
            });

        return dates;
    }, [currentMonth, monthAvailability]);

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', { locale: ptBR });
    }, [selectedDate]);

    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12;
        });
    }, [appointments]);

    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12;
        });
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment =>
            isAfter(parseISO(appointment.date), new Date()),
        );
    }, [appointments]);

    useEffect(() => {
        api
            .get(`/providers/${user.id}/month-availability`, {
                params: {
                    year: currentMonth.getFullYear(),
                    month: currentMonth.getMonth() + 1,
                },
            })
            .then(response => setMonthAvailability(response.data));
    }, [currentMonth, user.id]);

    useEffect(() => {
        api
            .get<Appointments>('/appointments/me', {
                params: {
                    year: selectedDate.getFullYear(),
                    month: selectedDate.getMonth() + 1,
                    day: selectedDate.getDate(),
                },
            })
            .then(response => {
                const appointmentsFormatted = response.data.map(appointment => {
                    return {
                        ...appointment,
                        formattedHour: format(parseISO(appointment.date), 'HH:mm'),
                    };
                });

                setAppointments(appointmentsFormatted);
            });
        console.log(appointments);
    }, [selectedDate]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={LogoImg} alt="GoBarber" />
                    <Profile>
                        <img src={user.avatar_url} alt={user.name} />
                        <div>
                            <span>Bem-Vindo,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>
                    <button onClick={signOut} type="button">
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>
                    <h1>Horários agendados<CreateAppointment><a href='/ForgotPassword'>Agendar um horário</a></CreateAppointment></h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>

                    {isToday(selectedDate) && nextAppointment && (
                        <NextAppointment>
                            <strong>Agendamento a seguir</strong>
                            <div>
                                <img
                                    src={nextAppointment?.provider.avatar_url}
                                    alt={nextAppointment?.provider.name}
                                />
                                <strong>{nextAppointment?.provider.name}</strong>
                                <span>
                                    <FiClock />
                                    {nextAppointment?.formattedHour}
                                </span>
                            </div>
                        </NextAppointment>
                    )}

                    <Section>
                        <strong>Manhã</strong>

                        {morningAppointments.length === 0 && (
                            <p>Nenhum agendamento neste período</p>
                        )}

                        {morningAppointments
                            ? morningAppointments.map(appointment => (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {appointment.formattedHour}
                                    </span>

                                    <div>
                                        <img
                                            src={appointment.provider.avatar_url}
                                            alt={appointment.provider.name}
                                        />
                                        <strong>{appointment.provider.name}</strong>
                                    </div>
                                </Appointment>
                            ))
                            : null}
                    </Section>
                    <Section>
                        <strong>Tarde</strong>

                        {afternoonAppointments.length === 0 && (
                            <p>Nenhum agendamento neste período</p>
                        )}

                        {afternoonAppointments.map(appointment => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.formattedHour}
                                </span>

                                <div>
                                    <img
                                        src={appointment.provider.avatar_url}
                                        alt={appointment.provider.name}
                                    />
                                    <strong>{appointment.provider.name}</strong>
                                </div>
                            </Appointment>
                        ))}
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        onMonthChange={handleMonthChange}
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

export default Dashboard;