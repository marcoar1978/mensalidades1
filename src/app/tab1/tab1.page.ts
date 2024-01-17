import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mensalista } from '../models/Mensalista';
import { MensalistaService } from '../services/mensalista.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
   
  mensalistas!: Mensalista[];

  constructor(private mensalistaService: MensalistaService, private router: Router) { }
  
  ngOnInit(): void {
    this.mensalistaService.mensalistaSubject.subscribe(res => {
      this.mensalistas = res;
      this.mensalistas = this.mensalistas.filter(m => m.ativo);
    })
  }

  toDetalhes(res: any): void {
   this.router.navigate(['tabs/tab1/detalhes'], { queryParams: { id: res.id }});
  }

}
