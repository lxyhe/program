import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class Sanitizer {

  constructor(
    public appsanitizer: DomSanitizer
  ) {

  }


}
