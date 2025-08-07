import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@ApiTags('Comandas')
@ApiBearerAuth()
@Controller('comandas')
export class BillController {
  constructor(private readonly billService: BillService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova comanda' })
  @ApiOkResponse({ description: 'Comanda criada com sucesso' })
  async create(@Body() dto: CreateBillDto) {
    return this.billService.createBill(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar comandas' })
  @ApiOkResponse({
    description: 'Lista de comandas retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          idUsuario: { type: 'number', example: 10 },
          nomeUsuario: { type: 'string', example: 'Maria da Silva' },
          telefoneUsuario: { type: 'string', example: '11998765432' },
        },
      },
    },

  })
  async list() {
    const bills = await this.billService.listBills();
    return bills.map((b) => ({
      id: b.id,
      idUsuario: b.idUsuario,
      nomeUsuario: b.nomeUsuario,
      telefoneUsuario: b.telefoneUsuario,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter comanda por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Comanda encontrada',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        idUsuario: { type: 'number', example: 10 },
        nomeUsuario: { type: 'string', example: 'Maria da Silva' },
        telefoneUsuario: { type: 'string', example: '11998765432' },
        produtos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              nome: { type: 'string', example: 'Café Expresso' },
              preco: { type: 'number', example: 9.5 },
            },
          },
        },
        createdAt: { type: 'string', format: 'date-time', example: '2025-08-01T12:34:56.000Z' },
        updatedAt: { type: 'string', format: 'date-time', example: '2025-08-01T12:34:56.000Z' },
      },
    },
    content: {
      'application/json': {
        examples: {
          exemplo: {
            summary: 'Comanda completa',
            value: {
              id: 1,
              idUsuario: 10,
              nomeUsuario: 'Maria da Silva',
              telefoneUsuario: '11998765432',
              produtos: [
                { id: 1, nome: 'Café Expresso', preco: 9.5 },
                { id: 2, nome: 'Pão de Queijo', preco: 6.0 },
              ],
              createdAt: '2025-08-01T12:34:56.000Z',
              updatedAt: '2025-08-01T12:34:56.000Z',
            },
          },
        },
      },
    },
  })
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.billService.getBillById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover comanda por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Comanda removida com sucesso' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.billService.deleteBill(id);
    return { success: { text: 'comanda removida' } };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar comanda por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Comanda atualizada com sucesso' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBillDto,
  ) {
    return this.billService.updateBill(id, dto);
  }
}
