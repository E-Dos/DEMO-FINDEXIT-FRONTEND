import { environment } from "../environments/environment";

export class AppSettings {
  public static puId = 1;
  public static readonly PAGE_SIZE = 15;
  public static readonly API_URL = environment.apiUrl;
  public static readonly LoginKey:string = environment.loginKey;
  public static readonly RoleKey = environment.roleKey;
}
