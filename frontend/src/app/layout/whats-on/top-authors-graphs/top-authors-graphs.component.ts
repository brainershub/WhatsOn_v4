import { Component, OnInit  } from '@angular/core';
import {ResultSharingService} from '../../../shared/services/result-sharing.service';
import * as CanvasModule from '../results/canvasjs.min.js';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-top-authors-graphs',
  templateUrl: './top-authors-graphs.component.html',
  styleUrls: ['./top-authors-graphs.component.scss']
})
export class TopAuthorsGraphsComponent implements OnInit {
  topAuthorarray = [];
  topAuthorarrayRes = [];
  updateddate:any;
  constructor(private resultService: ResultSharingService,
              private router:Router,
              private location:Location) { }

  ngOnInit(): void {
   
    this.topAuthorarrayRes=this.resultService.getTopAuthors();
    this.viewGraphs();

  }
  viewGraphs(){
    
    for(let i=0;i<this.topAuthorarrayRes.length;i++){
      this.topAuthorarray.push({author:this.topAuthorarrayRes[i].author,index:i})
    }
    console.log(this.topAuthorarray);
    for(let i=0; i<this.topAuthorarray.length; i++){
      this.generateGraph(i);
    }
    // this.generateGraph(0);
  }

  generateGraph(index:number){
    let dataArray = [];
    // console.log(index," : ",this.topAuthorarray[index]);
    this.topAuthorarrayRes=this.resultService.getTopAuthors();
    console.log("to array response : ", this.topAuthorarrayRes[index].content_date_list);
    for(let j=0;j<this.topAuthorarrayRes[index].content_date_list.length; j++){
      var date = new Date(this.topAuthorarrayRes[index].content_date_list[j]).toISOString();
      this.updateddate = new Date(date);
      dataArray.push({label: this.updateddate.getFullYear()+'-'+(this.updateddate.getMonth()+1)+'-'+this.updateddate.getDate(), y: this.topAuthorarrayRes[index].frequency_agg_list[j]});
    }
    console.log("DataArray : ", dataArray);
    let id=""
    switch(index){
      case 0:
        id = "growthChartOne";
        break;
      case 1:
        id = "growthChartTwo";
        break;
      case 2:
        id = "growthChartThree";
        break;
      case 3:
        id = "growthChartFour";
        break;
      case 4:
        id = "growthChartFive";
        break;
      default:
        id = "growthChartOne";
        break;

        
    }
    let chartOne = new CanvasModule.Chart(id, {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Author "+(index+1)
      },
      subtitles: [{
        text: this.topAuthorarrayRes[index].author
      }],
      data: [
        {
          type: "line",
          dataPoints: dataArray
        }]
     });
     chartOne.render();
  }

  ImageClick(){
    // this.router.navigate('/result');
    this.location.back()
  }

}
