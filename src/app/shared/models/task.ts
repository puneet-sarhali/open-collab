// import { Project } from './project';
import { User } from './user';


export interface Task {
    taskid: number,
    title: string,
    content: string,
    category: number,
    // assignedto: User,
    projectid: string
}

