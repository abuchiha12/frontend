import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;

  constructor(private httpClient: HttpClient, private validatorsService: ValidatorsService) { }

  ngOnInit(): void {
    // Tu código de inicialización aquí
  }

  public dataToUpdate: User = {
    email: '',
    foto: '',
    nombre: '',
    pais: '',
    telefono: '',
    password: '',
    newPass1: '',
    newPass2: ''
  };

  showAdditionalFields = false;

  isValidField(field: string) {
    // Implementa tu lógica de validación de campos aquí
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userForm.form.markAllAsTouched();
      this.dataToUpdate = {
        email: this.userForm.value.email || '',
        foto: this.userForm.value.foto || '',
        nombre: this.userForm.value.nombre || '',
        pais: this.userForm.value.pais || '',
        telefono: this.userForm.value.telefono || '',
        password: this.userForm.value.password1 || '', // Cambiar a password1
        newPass1: this.userForm.value.newPass1 || '',
        newPass2: this.userForm.value.newPass2 || ''
      };

      this.httpClient.put(`http://localhost:3000/auth/`, this.dataToUpdate)
        .subscribe(response => {
          // Maneja la respuesta del servidor aquí, por ejemplo, actualiza el estado de la aplicación si es necesario
          console.log('Campos editados con éxito', response);
        }, error => {
          // Maneja los errores de la solicitud aquí
          console.error('Error al editar los campos', error);
        });
    } else {
      console.log('Algo está mal');
    }
  }
}





