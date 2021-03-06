"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class MockRegisterFioAddress {
    constructor(fioAddress, publicKey, server) {
        this.ENDPOINT = "/register_fio_name";
        this.ACTION = "regaddress";
        this.ACOUNT = "fio.system";
        this.fioAddress = fioAddress;
        this.publicKey = publicKey;
        this.server = server;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {
                fio_name: this.fioAddress,
                owner_fio_public_key: this.publicKey
            };
            let options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            };
            return fetch(this.server + this.ENDPOINT, options).then(response => {
                let statusCode = response.status;
                let data = response.json();
                return Promise.all([statusCode, data]);
            })
                .then(([status, data]) => {
                if (status < 200 || status > 300) {
                    throw new Error(JSON.stringify({ errorCode: status, msg: data }));
                }
                else {
                    return data;
                }
            });
        });
    }
}
exports.MockRegisterFioAddress = MockRegisterFioAddress;
