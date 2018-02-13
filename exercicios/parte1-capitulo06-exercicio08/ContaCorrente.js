class ContaCorrente extends Conta {

    atualiza(taxa) {
        this._saldo += taxa;
    }

    // atualiza(taxa) {
    //     this._saldo = this._saldo + taxa;
    // }
}