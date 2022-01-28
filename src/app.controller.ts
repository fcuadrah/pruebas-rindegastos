import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getTheNumber')
  getNumber(@Req() request: Request): string {
    const first = parseInt(request.query['first'].toString());
    const second = parseInt(request.query['second'].toString());
    const message = this.appService.getTheNumber(first, second);
    //print (message);
    return  message;
  }

  @Get('getDaysUntilMyBirthday')
  getDays(@Req() request: Request): string {
    const birthdate = request.query['birthdate'].toString();
    const message = this.appService.getDaysUntilMyBirthday(birthdate);
    //print (message);
    return  message;
  }

  @Get('getConvertedAmount')
  async getConverted(@Req() request: Request): Promise<number> {
    const from = request.query['from'].toString();
    const to = request.query['to'].toString();
    const amount = parseFloat(request.query['amount'].toString());
    const monto = await this.appService.getConvertedAmount(from, to, amount);
    Logger.log(monto);
    
    return  monto;
  }
}

  