import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/controller/services/generic.service';
import { Mensagens } from '../../shared/components/mensagens';
import { CommonServices } from 'src/app/controller/services/common.service';

@Component({
  selector: 'app-cadastro-escola',
  templateUrl: './cadastro-escola.component.html',
  styleUrls: ['./cadastro-escola.component.css']
})

export class CadastroEscolaComponent implements OnInit {

  //comunicação entre componetes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter;

  //formulário e elementos
  cadastroForm: FormGroup;
  escolaId: string;
  escolaNome: string;
  labelDialog: string;

  //booleans
  displayAdicionar: boolean;
  displayExcluir: boolean;
  isEditar: boolean;

  //filter
  turmas: any[];
  filtered: any[];
  selected: string;

  constructor(
    private genericService: GenericService,
    private messageService: MessageService,
    private commonServices: CommonServices
  ) { }

  //função que inicia o componente
  ngOnInit() {
    this.getTurma();
    this.setUrl();
    this.formComponent();
  }

  //função que define o formulário 
  formComponent() {
    this.cadastroForm = new FormGroup({
      id: new FormControl(),
      nome: new FormControl((''), [Validators.required]),
      endereco: new FormControl((''), [Validators.required]),
      cnpj: new FormControl((''), [Validators.required]),
      turma: new FormControl((''), [Validators.required]),
    });
  }

  //função que define o tipo de endpoint 
  setUrl() {
    this.genericService.tipoUrl('escola');
  }

  //função que seta os parâmetros para adição
  setFormAdd() {
    this.cadastroForm.reset();
    this.labelDialog = 'Adição de Escola';
    this.isEditar = false;
  }

  //função que seta os parâmetros para edição
  setFormEdit(item) {
    this.cadastroForm.controls.nome.setValue(item.nome);
    this.cadastroForm.controls.endereco.setValue(item.endereco);
    this.cadastroForm.controls.cnpj.setValue(item.cnpj);
    this.cadastroForm.controls.turma.setValue(item.turma);
    this.cadastroForm.controls.id.setValue(item.id);
    this.labelDialog = 'Edição de Escola';
    this.isEditar = true;
  }

  //função que seta os parâmetros para remoção
  setFormRemove(item) {
    this.escolaNome = item.nome;
    this.escolaId = item.id;
    this.isEditar = false;
  }

  //função que cancela a interação e limpa o furmulário
  cancelar() {
    this.displayAdicionar = false;
    this.cadastroForm.reset();
  }

  //função para permitir apenas número no input
  numberOnly(event): boolean {
    return this.commonServices.numberOnly(event);
  }

  //função para adicionar o elemento selecionado
  salvar() {
    var addEscola = this.cadastroForm.value;
    this.genericService.cadastrar(addEscola)
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.CadastroSummary,
            detail: Mensagens.CadastroDetail
          });
          this.eventOutput.emit();
          this.cadastroForm.reset();
          this.displayAdicionar = false;
        }, error => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'warn',
            summary: Mensagens.CadastroErroSummary,
            detail: Mensagens.ConnectionErrorDetail
          });
          this.cadastroForm.reset();
        }
      );
  }

  //função para alterar o elemento selecionado
  editar() {
    var addEscola = this.cadastroForm.value;
    this.genericService.editar(addEscola)
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.ExcluirSummary,
            detail: Mensagens.ExcluirDetail
          });
          this.eventOutput.emit();
          this.cadastroForm.reset();
          this.displayAdicionar = false;
        }, error => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: Mensagens.ExcluirErroSummary,
            detail: Mensagens.ExcluirErroDetail
          });
        }
      );
  }

  //função para remover o elemento selecionado
  excluir() {
    this.genericService.remover(this.escolaId)
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.ExcluirSummary,
            detail: Mensagens.ExcluirDetail
          });
          this.eventOutput.emit();
          this.displayExcluir = false;
        }, error => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: Mensagens.ExcluirErroSummary,
            detail: Mensagens.ExcluirErroDetail
          });
        }
      );
  }

  //função de consulta das turmas cadastradas
  getTurma() {
    this.genericService.urlService = 'turma';
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

  //função que define valor ao item selecionado
  selectedValue(event) {
    if (event) {
      this.cadastroForm.controls.turma.setValue(event);
    }
  }

}
