import useSWR from 'swr'
import { SWRConfiguration } from 'swr/_internal'
import { z } from 'zod'

import { del, getBySWR, put, get } from './http'

export const Notification = z.object({
  id: z.string(),
  type: z.enum(['comment', 'reply', 'internal', 'external']),
  read: z.boolean(),
  createdAt: z.string(),
  data: z.object({
    postId: z.number().optional(),
    postTitle: z.string().optional(),
    commentId: z.number().optional(),
    commentContent: z.string().optional(),
    replyId: z.string().optional(),
    replyContent: z.string().optional(),
    user: z.object({
      id: z.number(),
      nickname: z.string(),
    }),
  }),
})

export const Notifications = z.array(Notification)

export const USE_FETCH_NOTIFICATIONS_KEY = '​/me/notifications'

export function useFetchNotifications(
  options: SWRConfiguration = {
    revalidateIfStale: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 30000,
  }
) {
  return useSWR<z.infer<typeof Notifications>>(USE_FETCH_NOTIFICATIONS_KEY, getBySWR, options)
}

export function putNotification(id: string) {
  return put(`/me/notifications/${id}`)
}

export function deleteNotification(id: string) {
  return del(`/me/notifications/${id}`)
}

export async function findByid() {
  return get(`/me`)
}
