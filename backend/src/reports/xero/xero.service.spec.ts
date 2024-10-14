import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { XeroService } from './xero.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('XeroService', () => {
  let service: XeroService;
  let httpService: HttpService;

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

    service = module.get<XeroService>(XeroService);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockAxiosResponse = (data: any): AxiosResponse => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: null,
  });

  it('should return balance sheet data on success', async () => {
    const mockData = { report: 'Balance Sheet Data' };
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of(mockAxiosResponse(mockData)));

    const result = await service.getBalanceSheet();
    expect(result).toEqual(mockData);
  });

  it('should throw BadRequestException for 400 error', async () => {
    const axiosError = new AxiosError('Bad Request', '', null, null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: null,
      data: { message: 'Bad Request' },
    });

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(service.getBalanceSheet()).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw UnauthorizedException for 401 error', async () => {
    const axiosError = new AxiosError('Unauthorized', '', null, null, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: null,
      data: { message: 'Unauthorized' },
    });

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(service.getBalanceSheet()).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw NotFoundException for 404 error', async () => {
    const axiosError = new AxiosError('Not Found', '', null, null, {
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: null,
      data: { message: 'Not Found' },
    });

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(service.getBalanceSheet()).rejects.toThrow(NotFoundException);
  });

  it('should throw InternalServerErrorException for 500 error', async () => {
    const mockError = {
      isAxiosError: true,
      response: { status: 500, data: 'Internal Server Error' },
    } as AxiosError;

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => mockError));

    await expect(service.getBalanceSheet()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw InternalServerErrorException for unexpected error', async () => {
    const mockError = new Error('Unexpected Error');

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => mockError));

    await expect(service.getBalanceSheet()).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
