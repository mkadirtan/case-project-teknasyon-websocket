import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  country: string;

  @Column()
  language: string;

  @Column()
  salt: string;

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}
