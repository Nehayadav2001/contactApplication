import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/MyContact';
import { myGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string='http://localhost:4000';

  constructor(private http:HttpClient) { }
  
  //Get All contacts Data
  public getAllContacts():Observable<MyContact[]>{
    let dataUrl:string=`${this.baseUrl}/contacts`;
    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError))
  }
  //get single contacts
  public getContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }
  //Create Contact
  public createContacts(contact:MyContact):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}/contacts`;
    return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }

  //update contacts
  public updateContacts(contact:MyContact,contactId:String):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }
  //delete contact
  public deleteContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }

  

  //get All Group
  public getAllGroups():Observable<myGroup[]>{
    let dataUrl:string=`${this.baseUrl}/groups`;
    return this.http.get<myGroup[]>(dataUrl).pipe(catchError(this.handleError))
  }
//get single Group
public getGroup(contact:MyContact):Observable<myGroup>{
  let dataUrl:string=`${this.baseUrl}/groups/${contact.groupId}`;
  return this.http.get<myGroup>(dataUrl).pipe(catchError(this.handleError))
}

//Error Solved
  public handleError(error:HttpErrorResponse){
    let errorMessage:string=''
    if(error.error instanceof ErrorEvent){
      //Client Error
      errorMessage=`Error:${error.error.message}`
    }else{
      //server side Error
      errorMessage=`Status: ${error.status}\n message:${error.message}`;
    }
    return throwError(errorMessage)
  }
}
