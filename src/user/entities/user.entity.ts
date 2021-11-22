import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Email: string;

  @Column()
  UserName: string;

  @Column()
  Password: string;

  @Column()
  Name: string;

  @Column({ type: 'timestamp' })
  Birthday: Date;
}
