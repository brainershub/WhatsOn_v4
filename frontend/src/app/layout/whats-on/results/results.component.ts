import { Component, OnInit } from '@angular/core';
import { ResultSharingService } from '../../../shared/services/result-sharing.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as CanvasModule from '../results/canvasjs.min.js'
import * as Highcharts from 'highcharts';
import {DashboardServiceService} from '../../../shared/services/dashboard-service.service'
import { Router } from '@angular/router';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);

export interface WordcloudItr{
  name:string,
  weight: number
}
export interface authorResultGraph{
  author:string,
  content_date: string
}

export interface sourceResultGraph{
  url_base:string,
  content_date: string
}
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  result: any;
  authorResult: any[];
  sourceResult: any[];
  otherResults: any[];
  authorpage = 1;
  authorpageSize = 4;
  sourcepage = 1;
  sourcepageSize = 4;
  otherpage = 1;
  otherpageSize = 5;
  authorCount: number
  sourceCount: number;
  otherCount: number;
  text: String;
  closeResult = '';
  graphData: any[];
  wordCloud=[];
  public activity;
  public xData;
  public label;
  options:any;
  articleLength:number;
  isPos:boolean;
  isNeg:boolean;
  isauthor:boolean;
  islbone:boolean;
  islbtwo:boolean;
  islbthree:boolean;
  isstartdate:boolean;
  isenddate:boolean;
  inputPosWord:string;
  inputNegWord:string;
  inputAuthor:string;
  inputLbOne:string;
  inputLbTwo:string;
  inputLbThree:string;
  inputStDate:string;
  inputEnDate:string;
  updateddate:any;
  authorResultGraphArr = [];
  sourceResultGraphArr = [];
  topAuthorarray = [];
  topAuthorarrayRes = [];
  isAuthorEnable:boolean;
  isSourceEnable:boolean;
  constructor(private resultService: ResultSharingService,
     private modalService: NgbModal,
     private dbService: DashboardServiceService,
     private router:Router) {
    this.result = this.resultService.getResult();
    this.convertJsonToArray(this.result.word_cloud);
    this.options = {
      accessibility: {
          screenReaderSection: {
              beforeChartFormat: '<h5>{chartTitle}</h5>' +
                  '<div>{chartSubtitle}</div>' +
                  '<div>{chartLongdesc}</div>' +
                  '<div>{viewTableButton}</div>'
          }
      },
      series: [{
          type: 'wordcloud',
          data: this.wordCloud,
          name: 'Occurrences'
      }],
      title: {
          text: ''
      }
  };
   }

  ngOnInit(): void {
    this.isAuthorEnable=false;
    this.isSourceEnable=false;
    this.isPos=true;
    this.isNeg=true;
    this.isauthor=true;
    this.islbone=true;
    this.islbtwo=true;
    this.islbthree=true;
    this.isstartdate=true;
    this.isenddate=true;
    if(localStorage.getItem("pos_words")==""){this.isPos=false}
    if(localStorage.getItem("negative_words")==""){this.isNeg=false}
    if(localStorage.getItem("authors")==""){this.isauthor=false}
    if(localStorage.getItem("label_one")==""){this.islbone=false}
    if(localStorage.getItem("label_two")==""){this.islbtwo=false}
    if(localStorage.getItem("label_three")==""){this.islbthree=false}
    if(localStorage.getItem("start_date")==""){this.isstartdate=false}
    if(localStorage.getItem("end_date")==""){this.isenddate=false}
    this.inputPosWord=localStorage.getItem("pos_words");
    console.log("start date : ",this.inputStDate," : ",this.isstartdate);
    this.inputNegWord=localStorage.getItem("negative_words");
    this.inputAuthor=localStorage.getItem("authors");
    this.inputLbOne=localStorage.getItem("label_one");
    this.inputLbTwo=localStorage.getItem("label_two");
    this.inputLbThree=localStorage.getItem("label_three");
    this.inputStDate=localStorage.getItem("start_date");
    this.inputEnDate=localStorage.getItem("end_date");


    
    //let ls=localStorage.getItem("apiSearch.pos_words")
    Highcharts.chart('container', this.options);
    // localStorage.setItem("my_result", JSON.stringify(this.resultService.getResult()));
    this.result = this.resultService.getResult();
    this.authorResult = this.result.author_ranking;
    this.sourceResult = this.result.source_ranking;
    this.authorCount = this.authorResult.length;
    this.sourceCount = this.sourceResult.length;
    this.otherResults = this.result.result;
    this.articleLength=this.otherResults.length;
    this.otherCount = this.otherResults.length;
    this.graphData = this.result.graph_data.result;
    this.convertJsonToArray(this.result.word_cloud);


    let dataPoints = [];
    dataPoints = this.processData(this.graphData);

    let chart = new CanvasModule.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Number of articles over time"
      },
      subtitles: [{
        text: "Try Zooming and Panning"
      }],
      data: [
        {
          type: "line",
          dataPoints: dataPoints
        }]
    });

    chart.render();

  }

  public generteGraph(){
    // let dataArray = [];
    this.isAuthorEnable=true;
    for(let i=0; i<this.result.result.length;i++){
      let item: authorResultGraph ={} as any;
      item.author = this.result.result[i].author;
      item.content_date = this.result.result[i].content_date;
      this.authorResultGraphArr.push(item);
    }
    
    this.dbService.authorGraphService(this.authorResultGraphArr).subscribe(
      res=>{
        //this.openTopAuthors(TopAuthorContent,res)
        this.resultService.setTopAuthors(res);
        this.router.navigateByUrl('/top-authors');

      }
    );
    
  }
  public generteSourceGraph(){
    this.isSourceEnable=true;
    for(let i=0; i<this.result.result.length;i++){
      let item: sourceResultGraph = {} as any;
      item.url_base = this.result.result[i].url_base;
      item.content_date = this.result.result[i].content_date;
      this.sourceResultGraphArr.push(item);
    }
    this.dbService.sourceGraphService(this.sourceResultGraphArr).subscribe(
      res=>{
        this.resultService.setTopSource(res);
        this.router.navigateByUrl('/top-source');
      }
    );
    
  }
  private processData(graphData: any) {
    let dataArray = [];
    
    graphData.forEach((d) => {
      if (!isNaN(Date.parse(d[0]))) {
        let date = new Date(d[0])
        let year = date.getFullYear();
        dataArray.push({ label: d[0], y: d[1] });

      }
    });
   console.log("minidu graph : ",dataArray);
    return dataArray;


  }



  open(content: any, values: any) {
    this.text = values.text;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public convertJsonToArray(request:any){
    for (let type in request){
     let item: WordcloudItr ={} as any;
     item.name=type;
     item.weight=request[type];
     this.wordCloud.push(item);
     
    }
    
  }

  public generteNetworkGraph(){
    this.dbService.networkGraphService().subscribe(
      res=>{
        console.log(res);
      }
    );
  }
}
