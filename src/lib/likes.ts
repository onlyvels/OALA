import type { LikesData } from './types';

export function countLikes(likes: LikesData): number {
  return Object.keys(likes).length;
}

export function hasUserLiked(likes: LikesData, userIP: string): boolean {
  return !!likes[userIP];
}