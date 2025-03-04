import { env } from '@/config/env';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  DynamoDBDocumentClient,
  UpdateCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import crypto from 'node:crypto';

export class DynamoClient {
  tableName = 'caixa-entradas';
  readonly dynamoClient: DynamoDBClient;
  readonly docClient: DynamoDBDocumentClient;
  constructor() {
    this.dynamoClient = new DynamoDBClient({
      region: 'sa-east-1',
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.docClient = DynamoDBDocumentClient.from(this.dynamoClient);
  }

  private getNewId() {
    return crypto.randomUUID();
  }

  public getTableName() {
    return this.tableName;
  }

  public async getAll(money: number) {
    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: 'money > :m',
      ExpressionAttributeValues: {
        ':m': money,
      },
    });

    const response = await this.docClient.send(command);
    return response.Items;
  }

  public async getOne(id: string, date: string) {
    const getCommand = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
        date,
      },
      ConsistentRead: true,
    });
    const getResponse = await this.docClient.send(getCommand);
    return getResponse.Item;
  }

  public async create({
    machine,
    money,
    date,
  }: {
    machine: number;
    money: number;
    date: number;
  }) {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        id: this.getNewId().toString(),
        date: date,
        machine: machine,
        money: money,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });
    return await this.docClient.send(command);
  }

  public async update({
    id,
    date,
    machine,
    money,
  }: {
    id: string;
    date: string;
    machine: number;
    money: number;
  }) {
    const updateCommand = new UpdateCommand({
      TableName: this.tableName,
      Key: { id: id, date: date },
      UpdateExpression: 'set machine = :machine, money = :money',
      ExpressionAttributeValues: {
        ':machine': Number(machine),
        ':money': Number(money),
      },
      ReturnValues: 'ALL_NEW',
    });
    return await this.docClient.send(updateCommand);
  }

  public async deleteOne(id: string, date: string) {
    const deleteCommand = new DeleteCommand({
      TableName: this.tableName,
      Key: {
        id,
        date,
      },
    });
    return await this.docClient.send(deleteCommand);
  }
}
