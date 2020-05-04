import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscolaComponent } from './escola.component';
import { CadastroEscolaComponent } from './cadastro-escola/cadastro-escola.component';

const EscolaRoutes: Routes = [
    {
        path: '',
        component: EscolaComponent,
        children: [
            {
                path: 'app-cadastro-escola',
                component: CadastroEscolaComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(EscolaRoutes),
    ],
    exports: [
        RouterModule
    ],
})

export class EscolaRoutingModule { }
