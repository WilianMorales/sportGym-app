import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  messageSuccess(titulo: string, message: string) {
    Swal.fire({
      title: titulo,
      text: message,
      icon: 'success'
    })
  }

  messageWarning(titulo: string, message: string) {
    Swal.fire({
      title: titulo,
      text: message,
      icon: 'warning'
    })
  }

  messageError(titulo: string, message: string) {
    Swal.fire({
      title: titulo,
      text: message,
      icon: 'error'
    })
  }
}
