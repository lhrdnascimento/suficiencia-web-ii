import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(1)
  id!: number;

  @ApiPropertyOptional({ example: 'Café com Leite' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @ApiPropertyOptional({ example: 12.0 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  preco?: number;
}

export class UpdateBillDto {
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuario?: number;

  @ApiPropertyOptional({ example: 'João Souza' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nomeUsuario?: string;

  @ApiPropertyOptional({ example: '11991234567' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  telefoneUsuario?: string;

  @ApiPropertyOptional({ type: [UpdateProductDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDto)
  produtos?: UpdateProductDto[];
}


