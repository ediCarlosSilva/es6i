class ContaPoupanca extends Conta {

    atualiza(taxa) {
        this._saldo += taxa * 2;
    }

    atualiza(taxa) {
        this._saldo = this._saldo + taxa * 2;
    }
}