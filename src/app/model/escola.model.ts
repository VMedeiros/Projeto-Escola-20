import { TurmaModel } from './turma.model';

export class EscolaModel {
    constructor(
        public id: number,
        public nome: string,
        public endereco: string,
        public cnpj: string,
        public turma: TurmaModel,
    ) { }
}