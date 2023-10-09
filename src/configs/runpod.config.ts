const sdk = require("api")("@runpod/v1.0#18nw21lj8lwwiy");
require("dotenv").config();

sdk.auth(process.env.RUNPOD_AUTH);
export { sdk };
