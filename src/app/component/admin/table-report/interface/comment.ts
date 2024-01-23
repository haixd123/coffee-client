export interface Comment {
  id: number,
  commentId: number,
  userId: number,
  postId: number,
  commentText: string,
  createAt: string,
  updateAt: string,
  likeComment: number,
  status: number,
}
