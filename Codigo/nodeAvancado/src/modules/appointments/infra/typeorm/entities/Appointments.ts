import {    Entity, 
            Column,
            PrimaryGeneratedColumn, 
            CreateDateColumn, 
            UpdateDateColumn, 
            ManyToOne,
            JoinColumn  } from "typeorm";

// interface AppointmentInterface
// {
//     provider : string,
//     date : Date;
// }

// import User from '@modules/users/infra/typeorm/entities/user';
import User from '../../../../users/infra/typeorm/entities/user';

@Entity('appointments') //decoreitor => apenas no typeScript
export default class Appointment{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name : 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
}
