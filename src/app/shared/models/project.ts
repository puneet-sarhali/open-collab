import { User } from './user';
export interface Project {
    projectid: number,
    // projectId: string,
    projectname: string,
    // title: string,
    description: string,
    upvotes: number,
    downvotes: number,
    score: number,
    createdat: Date,
    userid: string | undefined
    // comments: [string],
    // postedBy: User,
    // postedOn: Date
}

export enum ProjectState {
    inDevelopment,
    proposed,
    planning,
    maintenance
}

export interface Comment{
    commentId: string,
    comment: string,
    writtenBy: User,
    writtenOn: Date
}
