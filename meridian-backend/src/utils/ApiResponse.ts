export class ApiResponse<T> {
  public success: true = true;

  public constructor(
    public statusCode: number,
    public message: string,
    public data?: T,
  ) {}

  send(res: import("express").Response) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}
