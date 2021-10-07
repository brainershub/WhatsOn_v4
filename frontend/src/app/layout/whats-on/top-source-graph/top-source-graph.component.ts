import { Component, OnInit } from '@angular/core';
import {ResultSharingService} from '../../../shared/services/result-sharing.service';
import * as CanvasModule from '../results/canvasjs.min.js';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-source-graph',
  templateUrl: './top-source-graph.component.html',
  styleUrls: ['./top-source-graph.component.scss']
})
export class TopSourceGraphComponent implements OnInit {
  topSourcearray = [];
  topSourcearrayRes = [];
  updateddate:any;
  constructor(private resultService: ResultSharingService,
    private router:Router,
    private location:Location) { }

  ngOnInit(): void {
    this.topSourcearrayRes=this.resultService.getTopSource();
    this.viewGraphs();
  }

  viewGraphs(){
    for(let i=0; i<this.topSourcearrayRes.length; i++){
      this.topSourcearray.push({source:this.topSourcearrayRes[i].source, index:i})
    }
    for(let i=0; i<this.topSourcearray.length; i++){
      this.generateGraph(i);
    }
  }

  generateGraph(index:number){
    let dataArray = [];
    this.topSourcearrayRes=this.resultService.getTopSource();
    for(let j=0;j<this.topSourcearrayRes[index].content_date_list.length; j++){
      var date = new Date(this.topSourcearrayRes[index].content_date_list[j]).toISOString();
      this.updateddate = new Date(date);
      dataArray.push({label: this.updateddate.getFullYear()+'-'+(this.updateddate.getMonth()+1)+'-'+this.updateddate.getDate(), y: this.topSourcearrayRes[index].frequency_agg_list[j]});
    }
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
        text: "Source "+(index+1)
      },
      subtitles: [{
        text: this.topSourcearrayRes[index].source
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
    this.location.back()
  }

}
