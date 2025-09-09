import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Pessoas } from '../../../models/pessoas';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PessoaService } from '../../../services/pessoa.service';
import { MenuComponent } from "../../layout/menu/menu.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-carrolist',
  imports: [RouterLink, MenuComponent , DatePipe],
  providers: [MdbModalService],
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.scss']
})

export class PessoasListComponent {
  pessoaEdit: Pessoas = new Pessoas(0, "", "", new Date(), "");

   retornoDetalhe(pessoa: Pessoas){
  this.findAll();
  this.modalRef.close();
}
  lista: Pessoas[] = [];

  modalService = inject(MdbModalService);
  @ViewChild('modalPessoaDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  pessoaService = inject(PessoaService);

  constructor() {
    this.findAll();


    /* let pessoaNova = history.state.pessoaNova;
    let pessoaEditada = history.state.pessoaEditada;

     this.lista.push(new Pessoas(1, "Polyana"));
     this.lista.push(new Pessoas(2, "Débora"));
     this.lista.push(new Pessoas(3, "João"));
     this.lista.push(new Pessoas(4, "Gabriela"));

    if (pessoaNova) {
      pessoaNova.id = 3939;
      this.lista.push(pessoaNova);
    }

     if (pessoaEditada) {
     let indice = this.lista.findIndex(x => {
        return x.id == pessoaEditada.id;
      } );
      this.lista[indice] = pessoaEditada;
     } */
  }


  findAll() {
    this.pessoaService.findAll().subscribe({
      next: lista => {
        this.lista = lista
      }, error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }


  deleteById(pessoa: Pessoas) {
  Swal.fire({
    title: "Tem certeza que deseja deletar o registro?",
    icon: "warning",
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Sim',
    denyButtonText: 'Não'
  }).then((result) => {
    if (result.isConfirmed) {
      this.pessoaService.deleteById(pessoa.id).subscribe({
        next: () => {
          Swal.fire({
            title: "Deletado com sucesso!",
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.findAll();
        },
        error: () => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else if (result.isDenied) {
      Swal.fire({
        title: "Ação cancelada",
        icon: "info",
        confirmButtonText: "Ok"
      });
    }
  });
}

  new() {
    this.pessoaEdit = new Pessoas(0, "11562869920", "Poly", new Date, '');
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(pessoa: Pessoas) {
    console.log(pessoa);
    this.pessoaEdit = Object.assign({}, pessoa);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }
}