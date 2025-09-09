import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pessoas } from '../models/pessoas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/pessoas";

  constructor() { }

    findAll(): Observable<Pessoas[]>{
      return this.http.get<Pessoas[]>(this.API + "/findAll")
    }

    deleteById(id: number): Observable<Pessoas>{
      return this.http.delete<Pessoas>(this.API + "/deleteById/"+id)
    }

   save(pessoa: Pessoas): Observable<Pessoas>{
      return this.http.post<Pessoas>(this.API + "/save", pessoa)
    }

    update(pessoa: Pessoas, id: number,): Observable<Pessoas>{
      return this.http.put<Pessoas>(this.API + "/update/" + id, pessoa)
    }
  
    findById(id: number): Observable<Pessoas>{
      return this.http.get<Pessoas>(this.API + "/findById/"+id)
    }
}
