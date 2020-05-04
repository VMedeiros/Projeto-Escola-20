import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../shared/components/PrimeNg.module';
import { SharedComumModule } from '../shared/sharedComum.module';
import { CadastroEscolaComponent } from './cadastro-escola/cadastro-escola.component';
import { EscolaComponent } from './escola.component';
import { EscolaRoutingModule } from './escola.routing.module';
import { CommonServices } from 'src/app/controller/services/common.service';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        EscolaComponent,
        CadastroEscolaComponent,
    ],
    imports: [
        EscolaRoutingModule,
        SharedComumModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        /* ----interface---- */
        PrimeNgModule
    ],
    exports: [
        EscolaComponent
    ],
    providers: [
        CadastroEscolaComponent,
        CommonServices
    ],
})

export class EscolaModule { }
