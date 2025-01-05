import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Post as PostComponent } from './components/Post';
import { usePosts } from './hooks/usePosts';

function App() {
  const { posts, loading, error, handleLike, hasLiked } = usePosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostComponent
                key={post.id}
                post={post}
                onLike={handleLike}
                hasLiked={hasLiked(post.id)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;