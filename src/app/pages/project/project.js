export class Project {

    @Input() comments;

      updateComments(comments) {
        this.projectUpdated.next({
          comments
        });
    }
  }