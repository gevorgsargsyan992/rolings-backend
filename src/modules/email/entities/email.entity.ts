import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../../helpers/base.model';

@Entity('email_system')
export class EmailSystem extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false })
  template: string;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  dynamicTemplateData;
}
