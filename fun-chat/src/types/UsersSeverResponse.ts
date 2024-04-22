import User from "./User";

export default interface UsersServerResponse {
  id: string;
  type: "USER_INACTIVE" | "USER_ACTIVE";
  payload: {
    users: User[];
  };
}
