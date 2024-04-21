export default interface ServerResponse {
  id: string;
  type: "USER_LOGIN" | "ERROR" | "USER_LOGOUT";
  payload: {
    error?: string;
    user?: {
      login: string;
      isLogined: boolean;
    };
  };
}
