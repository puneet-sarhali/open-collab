import { Pipe, PipeTransform } from '@angular/core';
import {Project} from "../../../shared/models/project";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Project[], searchText: string): Project[] {


    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => {
      return (
        it.projectname!.toLocaleLowerCase().includes(searchText) ||
        it.description!.toLocaleLowerCase().includes(searchText) ||
        it.name!.toLocaleLowerCase().includes(searchText)
      );
    });

  }

}
