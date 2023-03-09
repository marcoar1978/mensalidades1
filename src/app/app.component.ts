import { Component, OnInit } from '@angular/core';
import { Mensalista } from './models/Mensalista';
import { Pgto } from './models/Pgto';
import { MensalistaService } from './services/mensalista.service';
import { ValoresConfigService } from './services/valores-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private mensalistaService: MensalistaService, private valoresConfigService: ValoresConfigService) {}
  
  ngOnInit(): void {
    this.mensalistaService.getAll().subscribe(res => {
     res.sort((m1, m2) => {
      if(m1.nomeSimp > m2.nomeSimp) return 1;
      if(m1.nomeSimp < m2.nomeSimp) return -1;
      return 0;
     }); 

     this.mensalistaService.mensalistaSubject.next(res);
    })

    this.valoresConfigService.getAll().subscribe(res => {
      this.valoresConfigService.valoresSubject.next(res);
    })
  }


}
