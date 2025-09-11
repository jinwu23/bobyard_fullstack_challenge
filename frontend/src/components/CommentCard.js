import { useState } from "react";

const CommentCard = ({ comment, comments, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  /* Calls onUpdate with comment id and new text */
  const handleSave = () => {
    onUpdate(comment.id, { text: editText });
    setIsEditing(false);
  };

  /* Undos text editing on comment */
  const handleCancel = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
            {comment.author[0]}
          </div>
          <div>
            <p className="font-medium text-gray-900">{comment.author}</p>
            <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Comment Text */}
      <div className="mb-3">
        {isEditing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            rows="3"
          />
        ) : (
          <p className="text-gray-800 leading-relaxed">{comment.text}</p>
        )}
      </div>

      {/* Image */}
      {comment.image_url && (
        <div className="mb-3">
          <img
            src={comment.image_url}
            alt="Comment attachment"
            className="rounded-lg max-w-full h-auto max-h-64 object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mb-2 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-gray-600">{comment.likes} likes</span>
        </div>
      </div>

      {/* Replies */}
      {comments.map(
        (reply) =>
          Number(reply.parent) === Number(comment.id) && (
            <CommentCard
              key={reply.id}
              comment={reply}
              comments={comments}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          )
      )}
    </div>
  );
};

export default CommentCard;
