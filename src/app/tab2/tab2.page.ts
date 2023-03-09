import { Component, OnInit } from '@angular/core';
import { Mensalista } from '../models/Mensalista';
import { MensalistaService } from '../services/mensalista.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  ano: number = new Date().getFullYear();
  anoSelect: number = new Date().getFullYear();
  mes!: string;
  mensalistas!: Mensalista[];

  constructor(private mensalistaService: MensalistaService) { }

  ngOnInit(): void {
    this.setMesSelect();
    this.setMensalistas();
  }

  private setMesSelect(): void {
    let mesAtual = new Date().getMonth() + 1;
    this.mes = (mesAtual < 10) ? "0" + mesAtual : mesAtual.toString();

  }

  private setMensalistas(): void {
    this.mensalistaService.mensalistaSubject.subscribe(res => {
      this.mensalistas = res;
    })
  }

  public setMesChecked(mes: string): string {
    return (mes == this.mes) ? 'selected' : '';
  }

  public getValorMes(mensalista: Mensalista): number {
    let verif: boolean = mensalista.mensalidades.some(m => m.ano == this.ano.toString() && m.mes == this.mes);
    if (mensalista.mensalidades.length > 0 &&  verif) {
      return mensalista.mensalidades.filter(mensalidade =>
        mensalidade.ano == this.ano.toString() && mensalidade.mes == this.mes
      )[0]?.valor as number;
    } else {
      return 0;
    }
  }

}
