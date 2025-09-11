import { useState, useEffect } from "react";
import { commentAPI } from "./services/api";
import CommentCard from "./components/CommentCard";
import AddComment from "./components/AddComment";

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentAPI.getComments();
      // Handle both paginated and non paginated API responses
      setComments(response.data.results || response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (commentData) => {
    try {
      const response = await commentAPI.createComment(commentData);
      setComments([response.data, ...comments]);
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    }
  };

  const handleUpdateComment = async (id, data) => {
    try {
      const response = await commentAPI.updateComment(id, data);
      setComments(comments.map((c) => (c.id === id ? response.data : c)));
    } catch (error) {
      console.error("Error updating comment:", error);
      setError("Failed to update comment. Please try again.");
    }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      await commentAPI.deleteComment(id);
      setComments(comments.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Bobyard Comments</h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts and engage with the community
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 text-sm font-medium mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Add Comment Form */}
        <AddComment onAdd={handleAddComment} />

        {/* Comments Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Comments ({comments.length})
          </h2>

          {comments.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            </div>
          ) : (
            <div>
              {/* Parent Comments */}
              {comments.map(
                (comment) =>
                  !comment.parent && (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      comments={comments}
                      onUpdate={handleUpdateComment}
                      onDelete={handleDeleteComment}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
