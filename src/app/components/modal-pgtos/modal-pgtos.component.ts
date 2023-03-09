import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Mensalista } from 'src/app/models/Mensalista';
import { Pgto } from 'src/app/models/Pgto';


@Component({
  selector: 'app-modal-pgtos',
  templateUrl: './modal-pgtos.component.html',
  styleUrls: ['./modal-pgtos.component.scss'],
})
export class ModalPgtosComponent implements OnInit, OnChanges {

  @Input()
  isModalOpen!: boolean;

  @Input()
  mensalista!: Mensalista;

  isInativedPgto!: boolean;

  @Output()
  isInativedPgtoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  modalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

 

  handlerMessage = '';
  roleMessage = '';
 

  constructor(private alertController: AlertController) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isModalOpen){
      this.isInativedPgto = false;
    }
  }

  ngOnInit(): void {
   
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.modalEvent.emit(this.isModalOpen);
    this.isInativedPgtoChange.emit(this.isInativedPgto);

  }

  inativaPgto(pgto: Pgto): void {
    this.mensalista.pgtos = this.mensalista.pgtos.filter(p => !(p.mes == pgto.mes && p.ano == pgto.ano && p.valor == pgto.valor && p.dataPgto == pgto.dataPgto));
    this.mensalista.mensalidades.forEach(mensalidade => {
      if(pgto.mes == mensalidade.mes && pgto.ano == mensalidade.ano){
          mensalidade.valor = mensalidade.valor - pgto.valor;
      }
    })
    this.isInativedPgto = true;

  }

  async presentAlert(pgto: Pgto) {
    const alert = await this.alertController.create({
      header: `Deseja deletar o pgto de R$ ${pgto.valor}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.inativaPgto(pgto);

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
