import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
