import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pgto } from 'src/app/models/Pgto';
import { ValoresConfig } from 'src/app/models/ValoresConfig';
import { ValoresConfigService } from 'src/app/services/valores-config.service';

@Component({
  selector: 'app-form-pgto',
  templateUrl: './form-pgto.component.html',
  styleUrls: ['./form-pgto.component.scss'],
})
export class FormPgtoComponent implements OnInit {

  @Input()
  ano!: number;

  @Input()
  mes!: string;

  @Input()
  valorPago!: number;

  @Input()
  valorConfig!: ValoresConfig;

  @Input()
  pgtos!: Pgto[];

  @Output()
  pgtoEvent: EventEmitter<Pgto> = new EventEmitter<Pgto>();

  form!: FormGroup;

  submit: boolean = false;

  pgto!: Pgto;

  verifDup:boolean = false;

  constructor(private valoresConfigService: ValoresConfigService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setPgto();
    this.setFormGroup();

  }

  private setPgto(): void {
    this.pgto = {
      mes: this.mes,
      ano: this.ano.toString(),
      dataPgto: "",
      valor: this.valorConfig.valorMensalidade - this.valorPago,
      formaPgto: 'pix',
      ativo: true
    }
  }

  private setFormGroup(): void {
    this.form = this.formBuilder.group({
      dataPgto: [null, [Validators.required]],
      valor: [this.pgto.valor, [Validators.required,
      Validators.max(this.valorConfig.valorMensalidade - this.valorPago),
      Validators.min(10)]],
      formaPgto: ['pix', []]
    })
  }

  public submitForm(): void {
    this.submit = true;
    this.verifDupPgto();
    if (this.form.valid && !this.verifDup) {
      this.valorPago += this.pgto.valor;
      this.pgtoEvent.emit(this.pgto);
      this.submit = false;
      this.setPgto();

    }
  }

  public verifDupPgto() {
    let verif = false;
    this.pgtos.forEach(p => {
      if (p.mes == this.pgto.mes && p.ano == this.pgto.ano && p.valor == this.pgto.valor && p.dataPgto == this.pgto.dataPgto) {
        verif = true;
      }
    })
    this.verifDup = verif;
  }

}
