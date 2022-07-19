import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from '../models/MyContact';
import { myGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean=false;
  public contact:MyContact={} as MyContact;
  public errorMessage:string | null=null;
  public group:myGroup[]=[] as myGroup[];


  constructor(private contService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.contService.getAllGroups().subscribe((data:myGroup[])=>{
      this.group=data;
    }, (error)=>{
      this.errorMessage=error;
     })
  }
  public addSubmit(){
    this.contService.createContacts(this.contact).subscribe((data:MyContact)=>{
    this.router.navigate(['/']).then();
  }, (error)=>{
    this.errorMessage=error;
    this.router.navigate(['/contact/add']).then();

   })

  }
}

