import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, catchError, firstValueFrom } from 'rxjs';

// In production app, these will come from an environment variable
const BASE_URL = 'http://xero-mock:3000';
const PATH = '/api.xro/2.0/Reports/BalanceSheet';

// NOTE: The console.log, console.error simulates logging in Production app
// NOTE The error handling is an example of a few typical errors. Could be different in a real app
@Injectable()
export class XeroService {
  constructor(private readonly httpService: HttpService) {}
  async getBalanceSheet() {
    const uri = `${BASE_URL}${PATH}`;

    console.log('Fetching balance sheet from Xero...');

    const response = this.httpService.get(uri).pipe(
      map((response: AxiosResponse) => response.data),
      catchError((error) => {
        // In production app, can expect different errors
        console.error('Failed to fetch data from Xero. Error:', error);
        throw new UnauthorizedException('Failed to fetch data from Xero.');
      }),
    );

    return await firstValueFrom(response);
  }
}
