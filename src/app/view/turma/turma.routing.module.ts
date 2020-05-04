import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import { TurmaComponent } from './turma.component';

const TurmaRoutes: Routes = [
    {
        path: '',
        component: TurmaComponent,
        children: [
            {
                path: 'app-cadastro-turma',
                component: CadastroTurmaComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(TurmaRoutes),
    ],
    exports: [
        RouterModule
    ],
})

export class TurmaRoutingModule { }
