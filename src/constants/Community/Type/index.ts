export interface CommunityPost {
  boardId: string
  commentAndReplyCount: number
  content: string
  createdAt: string
  id: number
  like: boolean
  thumbnail: null
  title: string
  likeCount: number
  user: {
    id: string
    nickname: string
  }
}

export interface CommunityCommentsType {
  content: string
  createdAt: string
  id: number
  like: boolean
  likeCount: number
  previewReplies: []
  updatedAt: string
  repl: {
    data: ReplyType[]
    next: boolean | number | undefined
  }
  user: { id: number; nickname: string }
}

export type filterItemType = {
  text: string
  key: string
}

export type ReplyType = {
  content: string
  createdAt: string
  id: number
  likeCount: number
  like?: {
    commentOrReplyId: number
    createdAt: string
    userId: number
  }
  mentionedUser?: {
    id: number
    nickname: string
  }
  updatedAt: string
  user: {
    id: number
    nickname: string
  }
}

export interface NestedCommentProps {
  data: ReplyType
  postId: number
  commentsId: number
  editReply: (commentsId: number, dataId: number, body: ReplyContent) => void
  deleteReply: (commentsId: number, dataId: number) => void
}

export type FormNestedUserData = {
  activityScore: number
  email: null | string
  id: number
  nickname: string
}

export interface FormNestedProps {
  userData: FormNestedUserData | undefined
  postId: number
  comment: number
  close: () => void
}
export interface CommentItem {
  repl?: {
    next: string | null
    data: ReplyType[]
  }
}

export interface CommunityComments {
  content: string
  createdAt: string
  id: number
  like: boolean
  likeCount: number
  previewReplies: []
  updatedAt: string
  repl?: {
    data: ReplyType[]
    next: boolean | number | undefined
  }
  user: { id: number; nickname: string }
}
export interface ReplyContent {
  content: string
}

export const TOOLBAR_ITEMS = [
  {
    type: 'button',
    options: {
      name: 'leftAlign',
      tooltip: '왼쪽 정렬',
    },
  },
  {
    type: 'button',
    options: {
      name: 'centerAlign',
      tooltip: '가운데 정렬',
    },
  },
  {
    type: 'button',
    options: {
      name: 'rightAlign',
      tooltip: '오른쪽 정렬',
    },
  },
]

// interface CommunityComments {
//   content: string
//   createdAt: string
//   id: number
//   like: boolean
//   likeCount: number
//   previewReplies: []
//   updatedAt: string
//   user: {
//     id: number
//     nickname: string
//   }
// }

// type CommentData = {
//   content: string
//   createdAt: string
//   id: number
//   like: { createdAt: string; userId: number; commentOrReplyId: number }
//   likeCount: number
//   mentionedUser: { id: number; nickname: string }
//   updatedAt: string
//   user: { id: number; nickname: string }
// }
