import { Post as PostType } from '../lib/types';
import { formatDate } from '../lib/date';
import { LikeButton } from './LikeButton';
import { countLikes } from '../lib/likes';

interface PostProps {
  post: PostType;
  onLike: (id: string) => void;
  hasLiked?: boolean;
}

export function Post({ post, onLike, hasLiked = false }: PostProps) {
  const totalLikes = countLikes(post.likes);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Content section */}
      <div className="mb-4">
        <p className="text-lg text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Metadata section */}
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">{post.user}</span>
          <LikeButton
            count={totalLikes}
            isLiked={hasLiked}
            onLike={() => onLike(post.id)}
          />
        </div>
        <div className="flex items-center justify-between border-t pt-2 mt-2 text-gray-500">
          <span>Added on: {formatDate(post.created)}</span>
          <span>Subject: {post.subject || 'General'}</span>
        </div>
      </div>
    </div>
  );
}