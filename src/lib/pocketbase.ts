import PocketBase from 'pocketbase';
import type { Post, LikesData } from './types';

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL!);

export async function fetchPosts(signal?: AbortSignal): Promise<Post[]> {
  try {
    const records = await pb.collection('Posts').getFullList<Post>(
      {
        sort: '-created',
      },
      { signal }
    );
    return records;
  } catch (error) {
    if (signal?.aborted) {
      return [];
    }
    console.error('Failed to fetch posts:', error);
    throw new Error('Failed to load posts. Please try again later.');
  }
}

export async function updatePostLikes(
  postId: string,
  likes: LikesData
): Promise<Post> {
  try {
    return await pb.collection('Posts').update<Post>(postId, { likes });
  } catch (error) {
    console.error('Failed to update post likes:', error);
    throw new Error('Failed to update likes. Please try again.');
  }
}

export function subscribeToCollection(callback: (record: Post) => void) {
  try {
    pb.collection('Posts').subscribe<Post>('*', (e) => {
      if (e.action === 'create') {
        callback(e.record);
      }
    });

    return () => {
      pb.collection('Posts').unsubscribe();
    };
  } catch (error) {
    console.error('Failed to subscribe to collection:', error);
    return () => {};
  }
}
