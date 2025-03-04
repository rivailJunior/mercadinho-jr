import { DynamoClient } from '@/lib/Dynamo';

const dynamoClient = new DynamoClient();

export async function GET() {
  const data = await dynamoClient.getAll(0);
  return Response.json(data);
}

export async function POST(request: Request) {
  const json = await request.json();
  const response = await dynamoClient.create(json);
  return Response.json({
    message: 'Saved successfully',
    data: response,
  });
}

export async function DELETE(request: Request) {
  const json = await request.json();

  const deleteResponse = await dynamoClient.deleteOne(json.id, json.date);
  if (deleteResponse.$metadata.httpStatusCode !== 200) {
    return Response.json({
      message: 'Error deleting',
    });
  }
  return Response.json({
    message: 'Deleted successfully',
  });
}

export async function PUT(request: Request) {
  const json = await request.json();

  const response = await dynamoClient.update(json);
  return Response.json({
    message: 'Updated successfully',
    data: response,
  });
}
