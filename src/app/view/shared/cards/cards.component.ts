import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  //função que chama a rota para listagem de escola
  eventEscola() {
    this.router.navigate(['home/escola/app-cadastro-escola']);
  }

  //função que chama a rota para listagem de turma
  eventTurma() {
    this.router.navigate(['home/turma/app-cadastro-turma'])
  }

}
