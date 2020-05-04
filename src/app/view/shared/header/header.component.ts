import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: any[];
  visibleSidebar2: boolean;

  user: string;
  perfil: string;

  constructor(
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.initializeVariables();
  }

  openLink() {
    this.visibleSidebar2 = true;
  }

  initializeVariables() {

    this.perfil = localStorage.getItem('perfil');
    if (this.perfil === 'administrador') {
      this.items = [
        { label: 'Auditoria', icon: 'pi pi-users', routerLink: ['/auditoria'] },
        { label: 'Gerenciar Acesso', icon: 'pi pi-cog', routerLink: ['/acesso'] },
        {
          label: 'Sair', icon: 'pi pi-power-off', routerLink: ['/login'], command: () => {
          }
        }
      ];
    } else if (this.perfil === 'gestor') {
      this.items = [
        { label: 'Auditoria', icon: 'pi pi-users', routerLink: ['/auditoria'] },
        { label: 'Gerenciar Acesso', icon: 'pi pi-cog', routerLink: ['/acesso'] },
        {
          label: 'Sair', icon: 'pi pi-power-off', routerLink: ['/login'], command: () => {
          }
        }
      ];
    } else {
      this.items = [
        {
          label: 'Sair', icon: 'pi pi-power-off', routerLink: ['/login'], command: () => {
          }
        }
      ];
    }
  }

}
