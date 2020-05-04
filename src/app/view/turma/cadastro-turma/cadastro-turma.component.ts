import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/controller/services/generic.service';
import { Mensagens } from '../../shared/components/mensagens';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {

  //comunicação entre componetes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter;

  //formulário e elementos
  cadastroForm: FormGroup;
  turmaId: string;
  turmaNome: string;
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
  ) { }

  //função que inicia o componente
  ngOnInit() {
    this.setUrl();
    this.formComponent();
  }

  //função que define o formulário 
  formComponent() {
    this.cadastroForm = new FormGroup({
      id: new FormControl(),
      nome: new FormControl((''), [Validators.required]),
      horario: new FormControl((''), [Validators.required]),
    });
  }

  //função que define o tipo de endpoint 
  setUrl() {
    this.genericService.tipoUrl('turma');
  }

  //função que seta os parâmetros para adição
  setFormAdd() {
    this.cadastroForm.reset();
    this.labelDialog = 'Adição de Turma';
    this.isEditar = false;
  }

  //função que seta os parâmetros para edição
  setFormEdit(item) {
    this.cadastroForm.controls.nome.setValue(item.nome);
    this.cadastroForm.controls.horario.setValue(item.horario);
    this.cadastroForm.controls.id.setValue(item.id);
    this.labelDialog = 'Edição de Turma';
    this.isEditar = true;
  }

  //função que seta os parâmetros para remoção
  setFormRemove(item) {
    this.turmaNome = item.nome;
    this.turmaId = item.id;
    this.isEditar = false;
  }

  //função que cancela a interação e limpa o furmulário
  cancelar() {
    this.displayAdicionar = false;
    this.cadastroForm.reset();
  }

  //função para adicionar o elemento selecionado
  salvar() {
    var addTurma = this.cadastroForm.value;
    this.genericService.cadastrar(addTurma)
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
    var addTurma = this.cadastroForm.value;
    this.genericService.editar(addTurma)
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
    this.genericService.remover(this.turmaId)
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

}
