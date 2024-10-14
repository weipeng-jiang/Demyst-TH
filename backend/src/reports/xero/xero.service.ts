import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { map, firstValueFrom } from 'rxjs';

// NOTE: The console.log, console.error simulates logging in Production app
@Injectable()
export class XeroService {
  // In production app, these will come from an environment variable
  private readonly baseUrl = 'http://xero-mock:3000';
  private readonly balanceSheetPath = '/api.xro/2.0/Reports/BalanceSheet';

  constructor(private readonly httpService: HttpService) {}
  async getBalanceSheet() {
    const URI = `${this.baseUrl}${this.balanceSheetPath}`;

    console.log('Fetching balance sheet from Xero...');
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(URI)
          .pipe(map((response: AxiosResponse) => response.data)),
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch balance sheet from Xero:', error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new BadRequestException(error.response.data);
        }

        if (error.response?.status === 401) {
          throw new UnauthorizedException(error.response.data);
        }

        if (error.response?.status === 404) {
          throw new NotFoundException(error.response.data);
        }
      }

      // Any exception not in the above, throw internal server error
      throw new InternalServerErrorException(
        'Something went wrong. Failed to fetch data from Xero.',
      );
    }
  }
}
