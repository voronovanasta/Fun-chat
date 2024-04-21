export default interface LoginProps {
  id: string;
  type: "USER_LOGIN" | "USER_LOGOUT";
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}
