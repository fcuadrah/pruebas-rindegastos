import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';

@Injectable()
export class AppService {
  getTheNumber(first: number, second: number): string {
    let concatenacion = '';
    //const retorno: string;
    for (let i = 1; i < second+1; i++) {
      let resultado = first * i;
      concatenacion = concatenacion + resultado;
    }
    if (concatenacion.length > 9) {
      concatenacion = concatenacion.slice(0, 8);
    }
    //retorno = concatenacion;
    return concatenacion;
  }

  getDaysUntilMyBirthday(birthdate: string): any{
    let dias;
    const cumple = new Date (birthdate);
    const hoy =  Date.now();
    const diferencia = cumple.valueOf() - hoy.valueOf();
    if (diferencia > 0) {
      dias = diferencia/(1000 * 60 * 60 * 24);  
    }
    else {
      dias = 'Su cumpleaños ya pasó. No se preocupe, se viene otro';
    }
    return dias;
  }

  async getConvertedAmount(from: string, to: string, amount: number): Promise<any> {

    const axios = require('axios');
    let monto = await axios.get('https://openexchangerates.org/api/latest.json?app_id=a864845c19ea44349095ea831b73d75f').then(function (response) {
      let  rates : any;
      let resultado;
      let conversion = 1; 
      rates = response.data.rates;
      if (from === 'USD') {
        if (rates.hasOwnProperty(to)){
          conversion = parseFloat(rates[to]);
          resultado = amount * conversion;  
        }
        else {
          resultado = 'Input inválido';
        }
      }
      else{
        if ( (rates.hasOwnProperty(from)) && (rates.hasOwnProperty(to)) ) {
          conversion = parseFloat(rates[from])/parseFloat(rates[to]);
          resultado = amount * conversion;  
        }
        else {
          resultado = 'Input inválido';
        }
      }
      
      return resultado;
        });
    //Logger.log(monto);
    return monto;
  }

}
