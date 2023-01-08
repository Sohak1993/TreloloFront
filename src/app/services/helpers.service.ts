import { Injectable } from '@angular/core';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    @Inject(LOCALE_ID) public locale: string,
  ) { }

  formatDate(format: string, date: Date) {
    return formatDate(date, format, this.locale)
  }
}
