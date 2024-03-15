import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from '../../contact/entities/contact.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  numero: string;

  @ManyToOne(() => Contact, (contato) => contato.numero, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contato_id', referencedColumnName: 'id' })
  contato?: Contact;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
