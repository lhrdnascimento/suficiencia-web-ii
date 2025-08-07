import { Module } from '@nestjs/common';
import { BillModule } from './bill/bill.module';

@Module({
  imports: [BillModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
