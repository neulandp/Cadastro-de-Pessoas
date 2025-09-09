import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pessoas } from '../../../models/pessoas';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PessoaService } from '../../../services/pessoa.service';

@Component({
  selector: 'app-pessoasdetails',
  imports: [FormsModule],
  templateUrl: './pessoas-details.component.html',
  styleUrls: ['./pessoas-details.component.scss']
})
export class PessoasDetailsComponent {

  @Input("pessoa") pessoa: Pessoas = new Pessoas(0, "", "", new Date(), "");
  @Output() pessoaSalva = new EventEmitter<Pessoas>();

  pessoaService = inject(PessoaService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    let id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {

    this.pessoaService.findById(id).subscribe({
      next: retorno => {
        this.pessoa = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }

  save() {
    if (this.pessoa.id > 0) {

      this.pessoaService.update(this.pessoa, this.pessoa.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/admin/pessoas'], { state: { pessoaEditada: this.pessoa } });
          this.pessoaSalva.emit(this.pessoa);


        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      })
    } else {
      this.pessoaService.save(this.pessoa).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/admin/pessoas'], { state: { pessoaNova: this.pessoa } });
          this.pessoaSalva.emit(this.pessoa);

        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }
      })
    }
  }
}