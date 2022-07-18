import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const comments = [
      { id: 12, name: 'Example comment', content: 'This is some example content' },
      { id: 13, name: 'Test', content: 'testestestest' },
      { id: 14, name: 'To do', content: '1. This assignment 2. SLEEP'  },
      { id: 15, name: 'Chores', content: '1. Clean room 2. Sweep living room 3. Repair curtains'  },
      { id: 16, name: 'Another example', content: 'Example...'  },
      { id: 17, name: 'Comment comment comment!', content: 'comment comment comment?'  },
      { id: 18, name: '???', content: '!!!'  },
      { id: 19, name: 'Ideas', content: 'yes'  },
      { id: 20, name: 'Thoughts...', content: 'no'  }
    ];
    
    return {comments};
  }

  // Overrides genId() to ensure every comment has an ID
  // Returns the initial number (11) if array is empty, else returns comment id + 1.
  genId(comments: Comment[]): number {
    return comments.length > 0 ? Math.max(...comments.map(comment => comment.id)) + 1 : 11;
  }
}