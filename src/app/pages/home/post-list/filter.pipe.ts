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
        (it.tag1) && it.tag1.toLocaleLowerCase().includes(searchText) ||
        (it.tag2) && it.tag2.toLocaleLowerCase().includes(searchText) ||
        (it.tag3) && it.tag3.toLocaleLowerCase().includes(searchText) ||
        it.name!.toLocaleLowerCase().includes(searchText)
      );
    });

  }

}
