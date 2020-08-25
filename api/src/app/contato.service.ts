
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Contatos} from './contatos';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url = 'http://localhost:3000/contatos';  

  constructor(
    private http: HttpClient
   
  ) { }

  // Cabeçalhos da requisição


   httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
//pegar todos os contatos
  getAllContatos(): Observable<Contatos[]> {
    return this.http.get<Contatos[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  //pegar contatos pelo ID
  getContatoById(contatoid: number): Observable<Contatos> {
    return this.http.get<Contatos>(this.url + '/' + contatoid)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
 
  adicionarContato(contato: Contatos): Observable<Contatos> {
    return this.http.post<Contatos>(this.url, JSON.stringify(contato), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
  atualizarContato(contato: Contatos): Observable<Contatos> {
    return this.http.put<Contatos>(this.url, JSON.stringify(contato), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  deleteContato(contato:Contatos): Observable<Contatos> {
    return this.http.delete<Contatos>(this.url + '/' + contato.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }  


  //Tratamento de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = error.error.message;
    } else {
      // Erro no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
