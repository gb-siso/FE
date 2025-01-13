import { CommunityCommentsType } from '@/constants/Community/Type/index'

export type CommentBoxType = ({
  data,
  postId,
  reFetch,
  isNew,
  updateReply,
  allComments,
  deleteComment,
  editReply,
}: {
  data: CommunityCommentsType
  postId: string
  reFetch: () => void
  deleteComment: (id: number) => void
  editComment: (id: number, body: { content: string }) => void
  updateReply: (comments: number) => void
  editReply: (commentsId: number, dataId: number, body: { content: string }) => void
  deleteReply: (commentsId: number, dataId: number) => void
  isNew: boolean
  allComments: CommunityCommentsType[]
}) => JSX.Element
