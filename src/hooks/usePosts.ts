import { useState, useEffect, useCallback } from 'react';
import { Post, fetchPosts, updatePostLikes, subscribeToCollection } from '../lib/pocketbase';
import { getUserIP } from '../lib/ip';
import { hasUserLiked } from '../lib/likes';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userIP, setUserIP] = useState<string | null>(null);

  useEffect(() => {
    getUserIP().then(setUserIP);
  }, []);

  const loadPosts = useCallback(async (signal: AbortSignal) => {
    try {
      const records = await fetchPosts(signal);
      if (!signal.aborted) {
        setPosts(records);
        setError(null);
      }
    } catch (err) {
      if (!signal.aborted) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadPosts(controller.signal);

    const unsubscribe = subscribeToCollection((newPost) => {
      setPosts(currentPosts => [newPost, ...currentPosts]);
    });

    return () => {
      controller.abort();
      unsubscribe();
    };
  }, [loadPosts]);

  const handleLike = async (postId: string) => {
    if (!userIP) return;

    const post = posts.find(p => p.id === postId);
    if (!post || hasUserLiked(post.likes, userIP)) return;

    try {
      const newLikes = { ...post.likes, [userIP]: true };
      
      setPosts(currentPosts => 
        currentPosts.map(p => 
          p.id === postId ? { ...p, likes: newLikes } : p
        )
      );

      await updatePostLikes(postId, newLikes);
    } catch (err) {
      setPosts(currentPosts => 
        currentPosts.map(p => 
          p.id === postId ? { ...p, likes: post.likes } : p
        )
      );
      console.error('Failed to like post:', err);
    }
  };

  return { 
    posts, 
    loading, 
    error, 
    handleLike,
    hasLiked: (postId: string) => {
      if (!userIP) return false;
      const post = posts.find(p => p.id === postId);
      return post ? hasUserLiked(post.likes, userIP) : false;
    }
  };
}