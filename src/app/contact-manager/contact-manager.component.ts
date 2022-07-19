import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/MyContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})

export class ContactManagerComponent implements OnInit {
public loading:boolean=false;
public contacts:MyContact[]=[];
public errorMessage:string | null=null;

  constructor(private cantService:ContactService) { }

  ngOnInit(): void {
    this.getAllcontactData();

  }
  getAllcontactData(){
    this.loading=true;
    this.cantService.getAllContacts().subscribe((data:MyContact[])=>{
      this.contacts=data;
      this.loading=false;
    },(error)=>{
      this.errorMessage=error;
      this.loading=false;
    })
  
  }
  deletecontact(contactId:string | undefined){
    if(contactId){
      this.cantService.deleteContacts(contactId).subscribe((data:{})=>{
        this.getAllcontactData();
      },(error)=>{
        this.errorMessage=error;
        this.loading=false;
      })
    }
  }

}
