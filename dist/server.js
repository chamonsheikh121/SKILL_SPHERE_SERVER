"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
let server;
async function bootstrap() {
    server = app_1.default.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=server.js.map