import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.css']
})
export class CurrencyExchangeComponent {

  public http: HttpClient;

  public accountSentController = new FormControl();
  public currencySentController = new FormControl();
  public accountRecivedController = new FormControl();
  public currencyRecivedController = new FormControl();
  public EntryDate: FormControl;
  public accountSentId: number;
  public accountRecivedId: number;
  public currencySentId: number;
  public currencyRecivedId: number;
  public ignoreSentAccount: boolean;
  public ignoreRecivedAccount: boolean;

  public currencySent: number;
  public feeCurrencySent: number;
  public currencyRecived: number;
  public feeCurrencyRecived: number;
  public rate: number;
  public finalValue: number;

  public feeSentRadio: number;
  public feeRecivedRadio: number;


  public accounts?: Account[] = [
    {
      id: 1,
      name: "stonks"
    },
    {
      id: 2,
      name: "nothing"
    }
  ];

  public currencies?: Currency[] = [
    {
      id: 1,
      name: "Dolars",
      sign:"$"
    },
    {
      id: 2,
      name: "Euro",
      sign: "euro"
    }
  ];

  accountSentListChange() {
    this.accountSentId = this.accountSentController.value.id;
  }
  accountRecivedListChange() {
    this.accountRecivedId = this.accountRecivedController.value.id;
  }
  
  currencySentListChange() {
    this.currencySentId = this.currencySentController.value.id;
  }
  currencyRecivedListChange() {
    this.currencyRecivedId = this.currencyRecivedController.value.id;
  }
  calclulateCurrencyRecived() {

    var sentFeeFinal = this.feeSentRadio == 1 ? this.currencySent * this.feeCurrencySent / 100 : this.feeCurrencySent
    this.currencyRecived = ((this.currencySent - sentFeeFinal) / this.rate);
    var recivedFeeFinal = this.feeRecivedRadio == 1 ? this.currencyRecived * this.feeCurrencyRecived / 100 : this.feeCurrencyRecived
    this.finalValue = this.currencyRecived - recivedFeeFinal;
  }

  addData() {
    var postData = new CurrencyExchangeDTO()
    postData.accountSentId = this.accountSentController.value.id;
    postData.accountRecivedId = this.accountRecivedController.value.id;
    postData.currencyRecivedId = this.currencyRecivedController.value.id;
    postData.currencySentId = this.currencySentController.value.id;
    postData.feeCurrencyRecived = this.feeCurrencyRecived;
    postData.feeCurrencySent = this.feeCurrencySent;
    postData.feeRecivedRadio = this.feeRecivedRadio;
    postData.feeSentRadio = this.feeSentRadio;
    postData.currencyRecived = this.currencyRecived;
    postData.currencySent = this.currencySent;
    postData.rate = this.rate;
    postData.finalValue = this.finalValue;
    postData.ignoreRecivedAccount = this.ignoreRecivedAccount;
    postData.ignoreSentAccount = this.ignoreSentAccount;
    postData.entryDate = this.EntryDate.value;

    this.http.post<boolean>('/CurrencyExchangeService', postData).subscribe(data => {
    })

  }

  constructor(http: HttpClient) {
    this.http = http;
    this.accountSentId = 0;
    this.accountRecivedId = 0;
    this.currencyRecivedId = 0;
    this.currencySentId = 0;

    this.feeCurrencyRecived = 0;
    this.feeCurrencySent = 0;
    this.currencyRecived = 0;
    this.currencySent = 0;
    this.rate = 0;
    this.finalValue = 0;
    this.feeSentRadio = 0;
    this.feeRecivedRadio = 0;

    this.ignoreSentAccount = false;
    this.ignoreRecivedAccount = false;

    this.EntryDate = new FormControl(new Date());
  }
}

export class Account {
  id?: number;
  name?: string;
}
export class Currency {
  id?: number;
  name?: string;
  sign?: string;
}

export class CurrencyExchangeDTO {
  public entryDate?: Date;
  public accountSentId?: number;
  public accountRecivedId?: number;
  public currencySentId?: number;
  public currencyRecivedId?: number;
  public ignoreSentAccount?: boolean;
  public ignoreRecivedAccount?: boolean;

  public currencySent?: number;
  public feeCurrencySent?: number;
  public currencyRecived?: number;
  public feeCurrencyRecived?: number;
  public rate?: number;
  public finalValue?: number;

  public feeSentRadio?: number;
  public feeRecivedRadio?: number;
}
