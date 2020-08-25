import { ContatoService } from './contato.service';
import { Contatos } from './contatos';
import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api';

  contatos = {} as Contatos;
  Contatos: Contatos[];


  constructor(private contatoService: ContatoService){}

  ngOnInit() {
    this.getContatosAgenda();
  }
  //verifica se ira ou nao adicionar o contato
 salvarContato(form:NgForm){
   if (this.contatos !== undefined) {
     this.contatoService.atualizarContato(this.contatos).subscribe(()=>{
       this.cleanForm(form);
     });
   }else{
     this.contatoService.adicionarContato(this.contatos).subscribe(()=>{
       this.cleanForm(form);
     });
   }
 }
// listar todos os contatos
getContatosAgenda(){
  this.contatoService.getAllContatos().subscribe((Contatos: Contatos[])=>{
    this.contatos = this.contatos;
  });
}

///apagar

  deleteContatoAgenda(contatos: Contatos) {
    this.contatoService.deleteContato(contatos).subscribe(() => {
      this.getContatosAgenda();
    });
  }

  // copia o carro para ser editado.
  editarContato(contato: Contatos) {
    this.contatos = { ...contato };
  }


//limparformulario
cleanForm(form:NgForm){
  this.getContatosAgenda();
  form.resetForm();
  this.contatos = {} as Contatos;
}

}
