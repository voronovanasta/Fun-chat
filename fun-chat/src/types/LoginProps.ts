export default interface LoginProps {
  id: string;
  type: "USER_LOGIN";
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}
