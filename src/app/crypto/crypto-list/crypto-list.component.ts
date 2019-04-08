import { Component, OnInit } from '@angular/core';
import { ICryptoHolding } from '../model/crypto-holding';
import { CryptoService } from '../service/crypto-repository.service';

@Component({
  templateUrl: './crypto-list.component.html'
})
export class CryptoListComponent implements OnInit {

  public cryptoHoldings: ICryptoHolding[] = [];
  public sumValue = 0;

  constructor( private cryptoService: CryptoService) { }

  public ngOnInit() {
    this.cryptoService.getCryptoHoldings().subscribe(
      cryptos => this.update(cryptos)
    );
  }

  private update(cryptos: ICryptoHolding[]) {
    this.cryptoHoldings = cryptos;
    this.sumValue = 0;
    this.cryptoHoldings.forEach(
      crypto => this.sumValue += crypto.value
    );
  }
}
