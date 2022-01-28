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
    let message = '';
    if ( (first < 0) || (second < 0) ){
      message = 'Input inválido';
    }
    else {
      message = this.appService.getTheNumber(first, second);
    }
    //print (message);
    return  message;
  }

  @Get('getDaysUntilMyBirthday')
  getDays(@Req() request: Request): string {
    const birthdate = request.query['birthdate'].toString();
    let validate = Date.parse(birthdate);
    let message = '';
    if ( isNaN(validate) ){
      message = 'Input inválido';
    }
    else {
      message = this.appService.getDaysUntilMyBirthday(birthdate);
    }
    //print (message);
    return  message;
  }

  @Get('getConvertedAmount')
  async getConverted(@Req() request: Request): Promise<any> {
    let monto;

    const fromValidate = request.query['from'];
    const toValidate = request.query['to'];
    
    if ((fromValidate == null) || (toValidate == null)){
      monto = 'Input inválido';
    }
    else {
      let from = fromValidate.toString();
      let to = toValidate.toString();
      const amount = parseFloat(request.query['amount'].toString());
    
      if (amount < 0){
        monto = 'Input inválido';
      }
      else {
        monto = await this.appService.getConvertedAmount(from, to, amount);
      }
      
    }
    return  monto;
  }
}

  