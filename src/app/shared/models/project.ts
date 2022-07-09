import { User } from './user';
export interface Project {
    projectid: number,
    projectname: string,
    description: string,
    upvotes: number,
    downvotes: number,
    score: number,
    createdat: Date,
    userid: string | undefined,
    name?: string,
    email?: string
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
