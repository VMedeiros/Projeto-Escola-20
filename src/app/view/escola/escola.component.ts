import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/controller/services/generic.service';
import { EscolaModel } from 'src/app/model/escola.model';
import { Mensagens } from '../shared/components/mensagens';
import { CadastroEscolaComponent } from './cadastro-escola/cadastro-escola.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escola',
  templateUrl: './escola.component.html',
  styleUrls: ['./escola.component.css']
})

export class EscolaComponent implements OnInit {

  //comunicação entre componetes
  @ViewChild(CadastroEscolaComponent) componetChild;

  //modelo
  escolas: EscolaModel[];

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
    this.genericService.tipoUrl('escola');
  }

  //função que define os parâmetros para a criação da tabela
  setParamsTable() {
    this.cols = [
      { field: 'nome', header: 'Nome', width: '40%', align: 'left' },
      { field: 'cnpj', header: 'CNPJ', width: '40%', align: 'left' },
      { field: 'endereco', header: 'Endereço', width: '40%', align: 'left' },
      { field: 'turma', header: 'Turma', width: '40%', align: 'left' },
    ];
  }

  //função que consulta as informações cadastradas
  getTableInfo() {
    this.genericService.consultar()
      .subscribe(
        (resp) => {
          if (resp.body === undefined) {
            this.escolas = [];
          } else {
            this.escolas = resp.body;
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
  getExcluir(event, escola) {
    this.componetChild.setFormRemove(escola);
    this.componetChild.displayExcluir = true;
  }

  //função que define os parametros de edição para o elemento filho
  getEditar(event, escola) {
    this.componetChild.setFormEdit(escola);
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