import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BillDao } from './bill.dao';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill, ProductItem } from './bill.entity';

@Injectable()
export class BillService {
  constructor(
    private readonly billDao: BillDao,
  ) { }

  async createBill(dto: CreateBillDto): Promise<Bill> {
    const produtos: ProductItem[] = dto.produtos.map((p, index) => ({
      id: index + 1,
      nome: p.nome,
      preco: p.preco,
    }));
    return this.billDao.createAndSave({
      idUsuario: dto.idUsuario,
      nomeUsuario: dto.nomeUsuario,
      telefoneUsuario: dto.telefoneUsuario,
      produtos,
    });
  }

  async listBills(): Promise<Bill[]> {
    return this.billDao.findAll();
  }

  async getBillById(id: number): Promise<Bill> {
    const bill = await this.billDao.findById(id);
    if (!bill) throw new NotFoundException('Comanda não encontrada');
    return bill;
  }

  async deleteBill(id: number): Promise<void> {
    const bill = await this.billDao.findById(id);
    if (!bill) throw new NotFoundException('Comanda não encontrada');
    await this.billDao.deleteById(id);
  }

  async updateBill(id: number, dto: UpdateBillDto): Promise<Bill> {
    const bill = await this.billDao.findById(id);
    if (!bill) throw new NotFoundException('Comanda não encontrada');

    if (dto.idUsuario !== undefined) bill.idUsuario = dto.idUsuario;
    if (dto.nomeUsuario !== undefined) bill.nomeUsuario = dto.nomeUsuario;
    if (dto.telefoneUsuario !== undefined) bill.telefoneUsuario = dto.telefoneUsuario;

    if (dto.produtos !== undefined) {
      // Merge only updates; do not allow removal. Update existing by id, add new ones with new ids if id not found? The spec disallows removing specific items; adding is allowed if provided.
      const currentById = new Map<number, ProductItem>(bill.produtos.map(p => [p.id, { ...p }]));
      for (const incoming of dto.produtos) {
        const existing = currentById.get(incoming.id);
        if (existing) {
          currentById.set(incoming.id, {
            id: existing.id,
            nome: incoming.nome ?? existing.nome,
            preco: incoming.preco ?? existing.preco,
          });
        } else {
          // Adding a new product is allowed, but both nome and preco must be provided
          if (incoming.nome === undefined || incoming.preco === undefined) {
            throw new BadRequestException('Para adicionar um novo produto, informe nome e preco.');
          }
          currentById.set(incoming.id, {
            id: incoming.id,
            nome: incoming.nome,
            preco: incoming.preco,
          });
        }
      }
      // Do not remove any existing items: keep all current ids
      bill.produtos = Array.from(currentById.values()).sort((a, b) => a.id - b.id);
    }

    return this.billDao.save(bill);
  }
}
