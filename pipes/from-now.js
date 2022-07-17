/* https://codequs.com/p/rJUmN3SF */

import {Pipe} from '@angular/core';
import Moment from 'moment';

@Pipe({
  // Name tused in templates
  // From now - relative time from now
  name: 'fromNow'
})

// Pipe transforms dates and timestamps to relative times 
export class FromNowPipe {
  // Transform method is called when the pipe is used within a template
  transform(value) {
    if (value && (value instanceof Date || 
        typeof value === 'number')) {
      return new Moment(value).fromNow();
    }
  }
}