import { URLSearchParams } from 'url'

export function http(input: string, init?: RequestInit) {
  return fetch(process.env.NEXT_PUBLIC_API_URL + input, init)
}

export function getURLSearchParams<T>(query: NonNullable<T>) {
  const keys = Object.keys(query) as (keyof T)[]

  return new URLSearchParams(
    keys.reduce(
      (prev, key) => {
        if (query[key] === undefined || query[key] === null) {
          return prev
        }

        prev[key] = String(query[key])

        return prev
      },
      {} as { [key in keyof T]: string }
    )
  )
}

export function getBySWR(input: string, init: RequestInit = {}) {
  return http(input, {
    ...init,
    method: 'get',
    credentials: 'include',
  }).then(response => response.json())
}

export function get(input: string, query?: URLSearchParams, init?: RequestInit) {
  if (!query?.toString()) {
    return http(input, {
      ...(init || {}),
      method: 'get',
      credentials: 'include',
    })
  }
  return http(input + `?${query?.toString()}`, {
    ...(init || {}),
    method: 'get',
    credentials: 'include',
  })
}

export function post<T>(input: string, body?: T, init?: RequestInit) {
  return http(input, {
    ...(init || {}),
    body: JSON.stringify(body),
    method: 'post',
    credentials: 'include',
    headers: {
      ...(init?.headers || {}),
      'Content-Type': 'application/json',
    },
  })
}

export function put<T>(input: string, body?: T, init?: RequestInit) {
  return http(input, {
    ...(init || {}),
    body: JSON.stringify(body),
    method: 'put',
    credentials: 'include',
    headers: {
      ...(init?.headers || {}),
      'Content-Type': 'application/json',
    },
  })
}

export function del(input: string, init?: RequestInit) {
  return http(input, {
    ...(init || {}),
    method: 'delete',
    credentials: 'include',
  })
}
