import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ResultSharingService {
  
public result:any[];
public topAuthorResult:any[];
public topSourceResult:any[];


  constructor() { }
  public setResult(res){
    
    this.result=res;
    
  }
   public getResult(){
    return this.result;
  }

  public setTopAuthors(res){
    
    this.topAuthorResult=res;
    
  }

  public getTopAuthors(){
    
    return this.topAuthorResult;
    
  }

  public setTopSource(res){
    
    this.topSourceResult=res;
    
  }

  public getTopSource(){
    
    return this.topSourceResult;
    
  }
}
