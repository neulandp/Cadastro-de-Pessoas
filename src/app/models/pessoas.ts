export class Pessoas {
 id!: number;
 cpf!: string;
 nome!: string;
 dataNascimento!: Date;
 email!: String;

 constructor(id: number, cpf: string, nome: string, dataNascimento: Date, email: string) {
  this.id = id;
  this.cpf = cpf;
  this.nome = nome;
  this.dataNascimento = dataNascimento;
  this.email = email;
 }
}
