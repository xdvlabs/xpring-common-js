"use strict";
const FakeWallet = require("../build/test/fakes/fake-wallet.js");
const { Payment } = require("../generated/Payment_pb.js");
const Signer = require("../build/src/signer.js");
const { Transaction } = require("../generated/Transaction_pb.js");
const { XRPAmount } = require("../generated/XRPAmount_pb.js");
const { assert } = require("chai");
const isHex = require("is-hex");
describe("signer", function () {
    it("sign", function () {
        const fakeSignature = "DEADBEEF";
        const wallet = new FakeWallet(fakeSignature);
        const value = 1000;
        const destination = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh";
        const fee = 10;
        const sequence = 1;
        const account = "r9LqNeG6qHxjeUocjvVki2XR35weJ9mZgQ";
        const paymentAmount = new XRPAmount();
        paymentAmount.setDrops(value);
        const payment = new Payment();
        payment.setDestination(destination);
        payment.setXrpAmount(paymentAmount);
        const transactionFee = new XRPAmount();
        transactionFee.setDrops(fee);
        const transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setFee(transactionFee);
        transaction.setSequence(sequence);
        transaction.setPayment(payment);
        const signedTransaction = Signer.signTransaction(transaction, wallet);
        assert.isTrue(isHex(signedTransaction.getTransactionSignatureHex()));
        assert.isTrue(isHex(signedTransaction.getPublicKeyHex()));
        assert.equal(signedTransaction.getTransactionSignatureHex(), fakeSignature);
        assert.equal(signedTransaction.getPublicKeyHex(), wallet.getPublicKey());
        assert.deepEqual(signedTransaction.getTransaction().toObject(), transaction.toObject());
    });
    it("sign fails with undefined wallet", function () {
        const value = 1000;
        const destination = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh";
        const fee = 10;
        const sequence = 1;
        const account = "r9LqNeG6qHxjeUocjvVki2XR35weJ9mZgQ";
        const paymentAmount = new XRPAmount();
        paymentAmount.setDrops(value);
        const payment = new Payment();
        payment.setDestination(destination);
        payment.setXrpAmount(paymentAmount);
        const transactionFee = new XRPAmount();
        transactionFee.setDrops(fee);
        const transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setFee(transactionFee);
        transaction.setSequence(sequence);
        transaction.setPayment(payment);
        const signedTransaction = Signer.signTransaction(transaction, undefined);
        assert.notExists(signedTransaction);
    });
    it("sign fails with undefined transaction", function () {
        const fakeSignature = "DEADBEEF";
        const wallet = new FakeWallet(fakeSignature);
        const signedTransaction = Signer.signTransaction(undefined, wallet);
        assert.notExists(signedTransaction);
    });
});
//# sourceMappingURL=signer-test.js.map