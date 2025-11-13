'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, MessageCircle, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { ProjectComment } from '@/types/enhanced';

interface CommentThreadProps {
  comments: ProjectComment[];
  projectId: string;
  onReply?: (commentId: string, content: string) => void;
  onVote?: (commentId: string, voteType: 'up' | 'down') => void;
  onDelete?: (commentId: string) => void;
  currentUserId?: string;
}

export default function CommentThread({
  comments,
  projectId,
  onReply,
  onVote,
  onDelete,
  currentUserId,
}: CommentThreadProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onVote={onVote}
          onDelete={onDelete}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}

interface CommentProps {
  comment: ProjectComment;
  onReply?: (commentId: string, content: string) => void;
  onVote?: (commentId: string, voteType: 'up' | 'down') => void;
  onDelete?: (commentId: string) => void;
  currentUserId?: string;
  depth?: number;
}

function Comment({
  comment,
  onReply,
  onVote,
  onDelete,
  currentUserId,
  depth = 0,
}: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply?.(comment.id, replyContent);
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  const netVotes = comment.upvotes - comment.downvotes;
  const isAuthor = currentUserId === comment.user_id;

  return (
    <div className={`${depth > 0 ? 'ml-8 pl-4 border-l-2 border-gray-200 dark:border-gray-700' : ''}`}>
      <div className="flex items-start space-x-3">
        {/* Vote buttons */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <button
            onClick={() => onVote?.(comment.id, 'up')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <ArrowUp className="h-4 w-4 text-gray-500" />
          </button>
          <span className={`text-xs font-medium ${netVotes > 0 ? 'text-green-600' : netVotes < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {netVotes}
          </span>
          <button
            onClick={() => onVote?.(comment.id, 'down')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <ArrowDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Comment content */}
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              {comment.author?.bio || 'Anonymous'}
            </span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.created_at))} ago
            </span>
            {isAuthor && (
              <span className="px-2 py-0.5 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded text-xs font-medium">
                You
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
            >
              <MessageCircle className="h-3 w-3" />
              <span>Reply</span>
            </button>

            {isAuthor && (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <MoreVertical className="h-3 w-3" />
                </button>

                {showMenu && (
                  <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10">
                    <button
                      onClick={() => {
                        onDelete?.(comment.id);
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reply form */}
          {showReplyForm && (
            <div className="mt-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-sm"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyContent('');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim()}
                  className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </div>
            </div>
          )}

          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onVote={onVote}
                  onDelete={onDelete}
                  currentUserId={currentUserId}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
