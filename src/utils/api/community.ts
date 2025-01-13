import { NextPagingType } from '@/app/community/_components/Context/CommunityContext'

import { post, get, del, put } from './http'

type bodyType = {
  boardId: string
  title: string
  content: string | undefined
}
type commentBodyType = {
  content: string
  mentionedUserId?: string
}

type LikeBodyType = {
  like: boolean
}
type commentPushLikeBodyType = {
  like: boolean
}

export function getPosts(limit: string, nextPage?: NextPagingType) {
  const query = `/search/posts?count=${limit}${nextPage ? `&next=${nextPage}` : ''}`
  return get(query)
}

export function fetchPost(id: string | string[]) {
  return get(`/posts/${id}`)
}
export function removePost(id: string | string[]) {
  return del(`/posts/${id}`)
}

export function writePost(body: bodyType) {
  return post(`/posts`, body)
}

export function editPost(id: string | string[], body: bodyType) {
  return put(`/posts/${id}`, body)
}

export function getPostComments(id: string, limit: string, nextComment?: NextPagingType) {
  const query = `/posts/${id}/comments?count=${limit}${nextComment ? `&next=${nextComment}` : ''}`
  return get(query)
}
export function getPostOldComments(id: string, limit: string, nextComment?: NextPagingType) {
  const query = `/posts/${id}/comments?direction=after&count=${limit}${nextComment ? `&next=${nextComment}` : ''}`
  return get(query)
}

export function reGetPostComments(id: string, nextComment?: boolean | number) {
  const query = `/posts/${id}/comments?${nextComment ? `&next=${nextComment}` : ''}`
  return get(query)
}

export function postComments(id: string, body: commentBodyType) {
  return post(`/posts/${id}/comments`, body)
}

export function fetchEditComment(postId: number, commentId: number, body: commentBodyType) {
  return put(`/posts/${postId}/comments/${commentId}`, body)
}

export function fetchDeleteComment(postId: number, commentId: number) {
  return del(`/posts/${postId}/comments/${commentId}`)
}

export function getBoardsCategory() {
  return get(`/boards`)
}

export function pushLike(id: string, body: LikeBodyType) {
  return put(`/posts/${id}/likes`, body)
}

export function commentPushLike(postId: string, commentId: string, body: commentPushLikeBodyType) {
  return put(`/posts/${postId}/comments/${commentId}/likes`, body)
}

export function getCommentReply(postId: string, commentId: number, nextPage?: number | string | boolean | undefined) {
  if (nextPage) {
    return get(`/posts/${postId}/comments/${commentId}/replies?next=${nextPage}`)
  }
  return get(`/posts/${postId}/comments/${commentId}/replies`)
}

export function getOldCommentReply(
  postId: string,
  commentId: number,
  nextPage?: number | string | boolean | undefined
) {
  if (nextPage) {
    return get(`/posts/${postId}/comments/${commentId}/replies?direction=after&next=${nextPage}`)
  }
  return get(`/posts/${postId}/comments/${commentId}/replies?direction=after`)
}

export function addCommentReply(postId: number, commentId: number, body: commentBodyType) {
  return post(`/posts/${postId}/comments/${commentId}/replies`, body)
}

export function editCommentReply(postId: number, commentId: number, replyId: number, body: commentBodyType) {
  return put(`/posts/${postId}/comments/${commentId}/replies/${replyId}`, body)
}

export function removeCommentReply(postId: number, commentId: number, replyId: number) {
  return del(`/posts/${postId}/comments/${commentId}/replies/${replyId}`)
}

export function likePushCommentReply(postId: number, commentId: number, replyId: number, body: LikeBodyType) {
  return put(`/posts/${postId}/comments/${commentId}/replies/${replyId}/likes`, body)
}

export function imageUpload() {
  return post('/medias/image')
}
