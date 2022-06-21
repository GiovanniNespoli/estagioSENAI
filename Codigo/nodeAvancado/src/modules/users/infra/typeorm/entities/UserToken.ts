import {    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn, 
    UpdateDateColumn, 
    Generated} from "typeorm";

@Entity('user_tokens')
export default class Users{

@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
@Generated('uuid')
token: string;

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at : Date;

}