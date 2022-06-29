import { User } from './user';
export interface Post{
    postid: string,
    projectName: string,
    // title: string,
    description: string,
    // upvotes: number,
    // downvotes: number,
    score: number,
    // comments: [string],
    // postedBy: User,
    // postedOn: Date
}

export interface Comment{
    commentId: string,
    comment: string,
    writtenBy: User,
    writtenOn: Date
}