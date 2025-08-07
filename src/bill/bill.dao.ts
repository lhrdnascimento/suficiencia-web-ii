import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './bill.entity';

@Injectable()
export class BillDao {
  constructor(
    @InjectRepository(Bill)
    private readonly repository: Repository<Bill>,
  ) { }

  async createAndSave(bill: Partial<Bill>): Promise<Bill> {
    const entity = this.repository.create(bill);
    return this.repository.save(entity);
  }

  async findAll(): Promise<Bill[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Bill | null> {
    return this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async save(bill: Bill): Promise<Bill> {
    return this.repository.save(bill);
  }
}


