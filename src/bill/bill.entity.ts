import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export interface ProductItem {
  id: number;
  nome: string;
  preco: number;
}

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('integer')
  idUsuario!: number;

  @Column('text')
  nomeUsuario!: string;

  @Column('text')
  telefoneUsuario!: string;

  @Column('simple-json')
  produtos!: ProductItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}


