import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensalista } from 'src/app/models/Mensalista';
import { Pgto } from 'src/app/models/Pgto';
import { Mensalidade } from 'src/app/models/Mensalidade';
import { MensalistaService } from 'src/app/services/mensalista.service';
import * as $ from 'jquery';
import { ValoresConfig } from 'src/app/models/ValoresConfig';
import { ValoresConfigService } from 'src/app/services/valores-config.service';

@Component({
  selector: 'app-meses',
  templateUrl: './meses.page.html',
  styleUrls: ['./meses.page.scss'],
})
export class MesesPage implements OnInit {

  mensalista!: Mensalista;
  mensalistas!: Mensalista[];
  valoresConfigs!: ValoresConfig[];
  valorConfig!: ValoresConfig;
  ano: number = new Date().getFullYear();
  anoSelect: number = new Date().getFullYear();
  isModalPgtoOpen: boolean = false;

  constructor(private actRoute: ActivatedRoute, private mensalistaService: MensalistaService, private valoresConfigService: ValoresConfigService) { }

  ngOnInit() {
    let id = this.actRoute.snapshot.queryParams['id'];
    this.mensalistaService.mensalistaSubject.subscribe(res => {
      this.mensalistas = res;
      this.mensalista = this.mensalistas.find(m => m.id == id) as Mensalista;
    })

    this.valoresConfigService.valoresSubject.subscribe(res => {
      this.valoresConfigs = res;
      this.valorConfig = this.valoresConfigs.find(v => v.ano == this.ano.toString()) as ValoresConfig;

    })
  }

  getPgtoMes(mes: string): number {

    if (this.mensalista.pgtos.length > 0) {
      return this.mensalista.pgtos
        .filter((pgto) => (pgto.ano == this.ano.toString() && pgto.mes == mes && pgto.ativo))
        .map((pgto) => pgto.valor)
        .reduce((acc, valor) => acc += valor, 0);
    }
    return 0;
  }

  public showFormPgto(mes: string, valorPago: number): void {
    if (valorPago < this.valorConfig.valorMensalidade) {
      $(`.form-mes:not(#form-mes-${mes})`).slideUp();
      $(`#form-mes-${mes}`).slideToggle();
    }
  }

  public addPgto(pgto: Pgto): void {
    $(`#form-mes-${pgto.mes}`).slideUp();
    this.setMensalidade(pgto);
    this.mensalista.pgtos.push(pgto);
    this.mensalistaService.update(this.mensalista);
    this.mensalistaService.getAll().subscribe(res => {
      this.mensalistaService.mensalistaSubject.next(res);
    })
  }

  private setMensalidade(pgto: Pgto): void {
    if (this.mensalista.mensalidades.some(m => pgto.mes == m.mes && pgto.ano == m.ano)) {
      this.mensalista.mensalidades.forEach(m => {
        if (pgto.mes == m.mes && pgto.ano == m.ano) {
          m.valor = m.valor + pgto.valor;
        }
      })
    }
    else {
      let mensalidade: Mensalidade = { ano: pgto.ano, mes: pgto.mes, valor: pgto.valor }
      this.mensalista.mensalidades.push(mensalidade);
    }

  }

  public setIsModalOpen(isOpen: boolean): void {
    this.sortMensalista();
    this.isModalPgtoOpen = isOpen;
  }

  public sortMensalista() {
    this.mensalista.pgtos.sort((p1, p2) => {
      let data1 = new Date(p1.dataPgto);
      let data2 = new Date(p2.dataPgto);
      if (data1.getTime() < data2.getTime()) return 1;
      else if (data1.getTime() > data2.getTime()) return -1;
      else return 0;
    })
  }

  public saveMensalista(saveOk: boolean): void {
    if (saveOk) {
      this.mensalistaService.update(this.mensalista);
      this.mensalistaService.getAll().subscribe(res => {
        this.mensalistaService.mensalistaSubject.next(res);
      })

    }

  }


}
