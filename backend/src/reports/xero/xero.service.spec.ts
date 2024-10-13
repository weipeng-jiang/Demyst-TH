import { Test, TestingModule } from '@nestjs/testing';
import { XeroService } from './xero.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { UnauthorizedException } from '@nestjs/common';

describe('XeroService', () => {
  let xeroService: XeroService;
  let httpService: HttpService;

  // Declare BASE_URL and PATH as in the class file
  const BASE_URL = 'http://host.docker.internal:3000';
  const PATH = '/api.xro/2.0/Reports/BalanceSheet';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XeroService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    xeroService = module.get<XeroService>(XeroService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return balance sheet data on success', async () => {
    const mockResponse: AxiosResponse = {
      data: { balanceSheet: 'mockData' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: null,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await xeroService.getBalanceSheet();

    expect(result).toEqual(mockResponse.data);
    expect(httpService.get).toHaveBeenCalledWith(`${BASE_URL}${PATH}`);
  });

  it('should throw UnauthorizedException when an error occurs', async () => {
    const mockError: Partial<AxiosError> = {
      isAxiosError: true,
      message: 'Network Error',
      config: null,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => mockError));

    await expect(xeroService.getBalanceSheet()).rejects.toThrow(
      UnauthorizedException,
    );
    expect(httpService.get).toHaveBeenCalledWith(`${BASE_URL}${PATH}`);
  });
});
