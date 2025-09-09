import { useState } from "react";

const AddComment = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    /* Prevent default form submission behavior */
    e.preventDefault();

    /* Checks if text field is empty */
    if (!text.trim()) return;

    setIsSubmitting(true);

    /* calls onAdd with comment data */
    try {
      const commentData = {
        text: text.trim(),
        image_url: imageUrl.trim() || null,
      };
      await onAdd(commentData);
      setText("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Add a Comment
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!text.trim() || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
