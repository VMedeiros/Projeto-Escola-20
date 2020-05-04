import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/controller/services/generic.service';
import { TurmaModel } from 'src/app/model/turma.model';
import { Mensagens } from '../shared/components/mensagens';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css'],
})

export class TurmaComponent implements OnInit {
  //comunicação entre componetes
  @ViewChild(CadastroTurmaComponent) componetChild;

  //modelo
  turmas: TurmaModel[];

  //tabela
  cols: any[];

  constructor(
    private genericService: GenericService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  //função que inicia o componente
  ngOnInit() {
    this.setUrl();
    this.getTableInfo();
    this.setParamsTable();
  }

  //função que define o tipo de endpoint 
  setUrl() {
    this.genericService.tipoUrl('turma');
  }

  //função que define os parâmetros para a criação da tabela
  setParamsTable() {
    this.cols = [
      { field: 'nome', header: 'Nome', width: '40%', align: 'left' },
      { field: 'horario', header: 'Horário', width: '40%', align: 'left' },
    ];
  }

  //função que consulta as informações cadastradas
  getTableInfo() {
    this.genericService.consultar()
      .subscribe(
        (resp) => {
          if (resp.body === undefined) {
            this.turmas = [];
          } else {
            this.turmas = resp.body;
          }
        })
      , error => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'warn',
          summary: Mensagens.ConnectionErrorSummary,
          detail: Mensagens.ConnectionErrorDetail
        });
      }
  }

  //função que define os parametros de exclusão para o elemento filho
  getExcluir(event, turma) {
    this.componetChild.setFormRemove(turma);
    this.componetChild.displayExcluir = true;
  }

  //função que define os parametros de edição para o elemento filho
  getEditar(event, turma) {
    this.componetChild.setFormEdit(turma);
    this.componetChild.displayAdicionar = true;
  }

  //função que define os parametros de adição para o elemento filho
  getAdicionar() {
    this.componetChild.setFormAdd();
    this.componetChild.displayAdicionar = true;
  }

  //função que retorna a tela de card
  eventVoltar() {
    this.router.navigate(['home/card'])
  }

}