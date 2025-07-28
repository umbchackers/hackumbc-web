import { POST } from './route';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => {
      return {
        emails: {
          send: jest.fn().mockResolvedValue({ data: {} }),
        },
      };
    }),
  };
});

const mockS3Send = jest.fn();
S3Client.prototype.send = mockS3Send;

const mockDynamoSend = jest.fn();
DynamoDBClient.prototype.send = mockDynamoSend;

describe("Form Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("succeeds in full transaction", async () => {
    mockS3Send.mockResolvedValueOnce({});
    mockDynamoSend.mockResolvedValueOnce({});

    const mockFile = new File(["resume"], "resume.pdf", { type: "application/pdf" });
    const formData = new FormData();
    formData.set("email", "test@example.com");
    formData.set("firstName", "Test");
    formData.set("lastName", "User");
    formData.set("resume", mockFile);

    const req = new Request("http://localhost", {
      method: "POST",
      body: formData,
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.error).toBeUndefined();
    expect(json.message).toContain("Form data sent successfully");
  });

  it("rolls back S3 on DynamoDB failure", async () => {
    mockS3Send.mockResolvedValueOnce({});
    mockDynamoSend.mockRejectedValueOnce(new Error("fail"));
    mockS3Send.mockResolvedValueOnce({});

    const mockFile = new File(["resume"], "resume.pdf", { type: "application/pdf" });
    const formData = new FormData();
    formData.set("email", "fail@example.com");
    formData.set("firstName", "Fail");
    formData.set("lastName", "User");
    formData.set("resume", mockFile);

    const req = new Request("http://localhost", { method: "POST", body: formData });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toContain("Transaction failed");
    expect(mockS3Send).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
  });

  it("halts if S3 upload fails", async () => {
    mockS3Send.mockRejectedValueOnce(new Error("s3 fail"));

    const mockFile = new File(["resume"], "resume.pdf", { type: "application/pdf" });
    const formData = new FormData();
    formData.set("email", "halt@example.com");
    formData.set("resume", mockFile);

    const req = new Request("http://localhost", { method: "POST", body: formData });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(mockDynamoSend).not.toHaveBeenCalled();
  });
});
