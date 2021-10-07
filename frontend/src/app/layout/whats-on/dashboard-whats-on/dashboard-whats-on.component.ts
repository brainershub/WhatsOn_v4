import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { DashboardServiceService } from '../../../shared/services/dashboard-service.service'
import {ResultSharingService} from '../../../shared/services/result-sharing.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard-whats-on',
  templateUrl: './dashboard-whats-on.component.html',
  styleUrls: ['./dashboard-whats-on.component.scss']
})
export class DashboardWhatsOnComponent implements OnInit {

  //public formDashboard: FormGroup
  possitiveWors: string;
  negativeWords: string;
  authors: string;
  labelOne: string;
  labelTwo: string;
  labelThree: string;
  labels=[];
  stdt:string;
  endt:string;
  startDate: string;
  endDate: string;
  data: any;
  sampleDate:any;
  date=[];
  result:any[];
  isenable:boolean;

  // pos_arr=[];


  constructor(
    private dashboarService: DashboardServiceService,
    private resultService: ResultSharingService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.isenable=false;
    localStorage.clear();
    this.possitiveWors="";
    this.negativeWords="";
    this.authors="";
    this.labelOne="";
    this.labelTwo="";
    this.labelThree="";
    this.startDate="";
    this.endDate="";
    this.stdt=this.startDate.toString();
    this.endt=this.endDate;
    
    // this.formDashboard = this.formBuilder.group({
    //   possitiveWords: ['kay'],
    //   negativeWords: [''],
    //   authors: [''],
    //   labelOne: [''],
    //   labelTwo: [''],
    //   labelThree: [''],
    //   startDate: [''],
    //   endDate: [''],
    
    // });
  }
  

  public apiSearch() {
    this.isenable=true;
    if(this.possitiveWors=="" && this.negativeWords=="" && this.authors=="" && this.labelOne=="" && this.labelTwo=="" && this.labelThree=="" && this.startDate=="" && this.endDate==""){
      Swal.fire(
        'Empty Fields',
        'Please Enter at least one search parameter!',
        'warning'
      )
      this.isenable=false;
    }
    else{
      let pos_arr=this.possitiveWors.split(',');
      let neg_arr=this.negativeWords.split(',');
      let authors_arr=this.authors.split(',');
      this.labels=[this.labelOne,this.labelTwo,this.labelThree]
      this.date=[this.startDate,this.endDate]
      console.log("labelone "+this.labelOne);
      console.log(this.endDate);
     
      this.data={"pos_words": pos_arr, "neg_words":neg_arr, "author": authors_arr, "labels": [this.labelOne, this.labelTwo, this.labelThree], "date": [this.startDate, this.endDate]}
      localStorage.setItem("pos_words",this.possitiveWors)
      localStorage.setItem("negative_words",this.negativeWords)
      localStorage.setItem("authors",this.authors)
      localStorage.setItem("label_one",this.labelOne)
      localStorage.setItem("label_two",this.labelTwo)
      localStorage.setItem("label_three",this.labelThree)
      localStorage.setItem("start_date",this.startDate)
      localStorage.setItem("end_date",this.endDate)
    this.dashboarService.searchTwo(this.data).subscribe(res=>{
      //debugger
      let resultsSet=res[0].result;
    let authorSet=res[0].author_ranking;
    let sourceSet=res[0].source_ranking;
    let graphSet=res[0].graph_data;
    console.log("*****", res[0])
    
    if(res[0].author_ranking.length==0 && res[0].graph_data.length==0 && res[0].result.length==0 && res[0].source_ranking.length==0 && res[0].word_cloud.length==0)
    {  
      this.isenable=false;
      Swal.fire(
          'No Results!',
          'Entered values does not show any result!',
          'warning'
        )
      }
      else{
        this.resultService.setResult(res[0]);
      this.router.navigateByUrl('/result');
      }
      
    },
    (error)=>{
      this.isenable=false;
      Swal.fire(
        'No Results!',
          'Entered values does not show any result!',
          'warning'
      )
      console.log("error message",error);
      
    }
   );
    }


  }


}
