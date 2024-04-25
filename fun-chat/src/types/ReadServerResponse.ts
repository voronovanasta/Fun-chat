export default interface DeliveryServerResponse {
  id: null;
  type: "MSG_READ";
  payload: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
}
