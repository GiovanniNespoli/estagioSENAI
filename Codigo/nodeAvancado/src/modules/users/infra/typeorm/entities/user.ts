import { Exclude, Expose } from "class-transformer";
import { APP_API_URL } from '@shared/utils/environment';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

import storageConfig from '@config/storage';

@Entity('users')
export default class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar' })
    getAvatar(): string | null {
        if (!this.avatar) {
            return null;
        };

        switch (storageConfig.driver) {
            case 'disk':
                return `${APP_API_URL}/files/${this.avatar}`;       
            default:
                return null;
        };
    }

}