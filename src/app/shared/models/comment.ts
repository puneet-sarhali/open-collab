export interface Comment{
  comment_id: number,
  project_id: number,
  author_uid: string,
  content: string,
  posted_on: Date,
  like_count: number
  name?: string
}
