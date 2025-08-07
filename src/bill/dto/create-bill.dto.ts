import { IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'Café Expresso' })
  // id será atribuído automaticamente de forma incremental no serviço
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiProperty({ example: 9.5 })
  @IsNumber()
  @IsPositive()
  preco!: number;
}

export class CreateBillDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  idUsuario!: number;

  @ApiProperty({ example: 'Maria da Silva' })
  @IsString()
  @IsNotEmpty()
  nomeUsuario!: string;

  @ApiProperty({ example: '11998765432' })
  @IsString()
  @IsNotEmpty()
  telefoneUsuario!: string;

  @ApiProperty({ type: [ProductDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  produtos!: ProductDto[];
}


