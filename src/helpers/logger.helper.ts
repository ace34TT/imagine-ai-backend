import moment from "moment";
export const logger = (message: string) => {
  var timestamp = moment().format("MMM DD hh:mm:ss A");
  console.log(timestamp + " " + message);
};
