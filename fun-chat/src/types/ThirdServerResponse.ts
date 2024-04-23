export default interface ThirdServerResponse {
  id: string;
  type: "USER_EXTERNAL_LOGIN" | "USER_EXTERNAL_LOGOUT";
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
}
