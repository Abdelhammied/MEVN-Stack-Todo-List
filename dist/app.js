"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @modules
 */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
require('dotenv').config();
/**
 * @initalize
 */
const app = express_1.default();
const MONGO_DB_CLIENT = process.env.MONGODB;
mongoose_1.default.connect(MONGO_DB_CLIENT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(response => { })
    .catch(err => console.error(err));
// Bearer Token
app.use(express_bearer_token_1.default());
/**
 * @routes
 */
const auth_1 = __importDefault(require("./routes/auth"));
const todos_1 = __importDefault(require("./routes/todos"));
/**
 * @usage
 */
// Body Parser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Routes
app.use(auth_1.default);
app.use(todos_1.default);
/**
 * @appStart
 */
app.listen(3000, () => {
    // console.log('Server Is Running At Port 3000');
});
