"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = __importDefault(require("../../src/wallet"));
const defaultKeyPair = {
    publicKey: "031D68BC1A142E6766B2BDFB006CCFE135EF2E0E2E94ABB5CF5C9AB6104776FBAE",
    privateKey: "0090802A50AA84EFB6CDB225F17C27616EA94048C179142FECF03F4712A07EA7A4"
};
const defaultMnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
class FakeWallet extends wallet_1.default {
    constructor(signature, keyPair = defaultKeyPair, mnemonic = defaultMnemonic, derivationPath = wallet_1.default.getDefaultDerivationPath()) {
        super(keyPair, mnemonic, derivationPath);
        this.signature = signature;
    }
    sign(_hex) {
        return this.signature;
    }
}
exports.default = FakeWallet;
//# sourceMappingURL=fake-wallet.js.map