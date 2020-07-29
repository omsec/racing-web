// https://stackoverflow.com/questions/52446544/using-env-variables-in-template-files

import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'env'
})
export class EnvPipe implements PipeTransform {

  transform(variable: string): any {
    return environment[variable];
  }

}
