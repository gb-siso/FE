import { z } from 'zod';

import { post } from './http';

export const PostSocialSignInBody = z.object({
  social: z.enum(['naver', 'kakao']).default('naver'),
  code: z.string(),
  state: z.string().optional()
});

export function postSocialSignIn(body: z.infer<typeof PostSocialSignInBody>) {
  return post('​/auths/social-sign-in', body);
}

export const PostSocialSignUpBody = PostSocialSignInBody.extend({
  nickname: z.string().min(1, '닉네임을 입력해 주세요')
});

export function postSocialSignUp(body: z.infer<typeof PostSocialSignUpBody>) {
  return post('​/auths/social-sign-up', body);
}

export function postEmailSignIn(body: { email: string; password: string }) {
  return post('/auths/sign-in', body);
}
export function postSignOut() {
  return post('​/auths/sign-out');
}
