import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-whatson-dashboard',
  templateUrl: './whatson-dashboard.component.html',
  styleUrls: ['./whatson-dashboard.component.scss']
})
export class WhatsonDashboardComponent implements OnInit {
  public form: FormGroup
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      possitiveWords: [''],
      negativeWords: [''],
      authors: [''],
      labelOne: [''],
      labelTwo: [''],
      labelThree: [''],
      startDate: [''],
      endDate: [''],
    });
  }

}
