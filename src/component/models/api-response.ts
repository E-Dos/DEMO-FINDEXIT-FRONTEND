export class ApiResponse {
  public status: number = 0;
  public message: string = "";
  public result: any;

  public get isSuccess(): boolean {
    return this.message == "success"
  }
}
