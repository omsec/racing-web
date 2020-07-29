import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { CodeType } from '../_models/code-type';
import { CodeReaderService } from './code-reader.service';



@Injectable({
  providedIn: 'root'
})
export class CodeResolverService implements Resolve<CodeType[]> {

  constructor(private codeService: CodeReaderService) { }

  resolve(): Observable<CodeType[]> {
    return this.codeService.getCodeMap();
  }
}
