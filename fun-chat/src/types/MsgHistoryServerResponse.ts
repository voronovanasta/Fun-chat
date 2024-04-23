export default interface MsgHistoryServerResponse {
  id: string;
  type: "MSG_FROM_USER";
  payload: {
    messages: [];
  };
}
