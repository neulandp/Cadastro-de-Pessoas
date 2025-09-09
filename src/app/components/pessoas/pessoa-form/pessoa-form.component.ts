import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PessoaService } from '../../../services/pessoa.service';
import { Pessoas } from '../../../models/pessoas';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-pessoa-form',
  standalone: true, 
  imports: [ MdbFormsModule , RouterLink , ReactiveFormsModule],
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;

  constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private pessoaService: PessoaService
) {}

  ngOnInit(): void { //Método para quando o componente inicia
    this.form = this.fb.group({ //Cria o formulário com campos e validações básicas
      id: [null],
      nome: ['', Validators.required],
      cpf: [''],
      dataNascimento: [''],
      email: ['', [Validators.required, Validators.email]]
    });

    const id = this.route.snapshot.paramMap.get('id'); //Pega parâmetro id da URL
    if (id) { //Se tem id, está editando
      this.editando = true;
      this.pessoaService.findById(+id).subscribe((pessoa) => {
        this.form.patchValue(pessoa); //Preenche o formulário com os dados da pessoa para editar
      });
    }
  }

  salvar(): void { //Método para enviar o formulário
    if (this.editando) { //Se estiver editando, chama update
      this.pessoaService.update(this.form.value, this.form.value.id).subscribe(() => {
        this.router.navigate(['/admin/pessoas']); //Após salvar, volta para a lista de pessoas
      });
    } else { //Se não estiver editando, chama save para criar novo
      this.pessoaService.save(this.form.value).subscribe(() => {
        this.router.navigate(['/admin/pessoas']); //Após salvar, volta para a lista de pessoas
      });
    }
  }
}