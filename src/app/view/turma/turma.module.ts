import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComumModule } from '../shared/sharedComum.module';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import { TurmaComponent } from './turma.component';
import { TurmaRoutingModule } from './turma.routing.module';
import { PrimeNgModule } from '../shared/components/PrimeNg.module';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        TurmaComponent,
        CadastroTurmaComponent,
    ],
    imports: [
        TurmaRoutingModule,
        SharedComumModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        /* ----interface---- */
        PrimeNgModule
    ],
    providers: [
    ],
})

export class TurmaModule { }
