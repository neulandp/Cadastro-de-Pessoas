import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  imports: [ FormsModule , MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
//O ! é utilizado para que as classes sejam inicializadas na declaração
  usuario!: string; //Declara variável para armazenar o nome do usuário digitado
  senha!: string; //Declara variável para armazenar a senha digitada

  router = inject(Router); //Navegar entre páginas dentro do componente

  login() { //Método para quando o usuário tentar fazer login
    if (this.usuario == 'admin' && this.senha == 'admin') { //Faz a verificação, usuário e senha precisam ser "admin"
      this.router.navigate(['admin/pessoas']) //Navega para a rota "admin/pessoas"
    } else { //Caso contrário, mostra alerta de erro
      alert("Usuário ou senha estão incorretos!") //Com essa mensagem
    }
  }

}