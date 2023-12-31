import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { User } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'shared-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit { // Debes implementar OnInit para utilizar ngOnInit
  // Rutas de nuestro menú
  isSettingsMenuOpen: boolean = false;
  public nombre?:string;
  public foto?:string;
  public menuItems: MenuItem[] = [
    { route: '/lineas/list', name: 'Líneas', icon: 'zmdi-reader' },
    { route: '/fuentes/list', name: 'Fuentes', icon: 'zmdi-device-hub' },
    { route: '/contactos/list', name: 'Contactos', icon: 'zmdi-accounts-alt' },
  ];
  public userData?: User;

  constructor(private service: AuthService) {}
  
 
  ngOnInit(): void {  
    
    this.service.getUserInfo().subscribe((user: User | null) => {
      if (user) {
   this.nombre = user?.nombre;
        const imageName = user.foto;
        this.foto = `${environment.baseUrl}/serve-images/${imageName}`;
      } else {
        console.log('Los datos del usuario son nulos');
      }
    });

  }
  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }
}
