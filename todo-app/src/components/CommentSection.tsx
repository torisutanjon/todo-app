import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { NavLink } from "react-router-dom";
import { commentAPI } from "../api";

interface PropTypes {
  todoID: string;
  todoCreator: string;
}

interface TokenTypes {
  userid: string;
  username: string;
}

interface CommentTypes {
  commentid: string;
  body: string;
  creatorID: string;
  creatorName: string;
}

interface CommentBodyTypes {
  body: string;
}

const CommentSection = ({ todoID, todoCreator }: PropTypes) => {
  const [comments, setComments] = useState<Array<CommentTypes>>();
  const [commentBody, setCommentBody] = useState<Array<CommentBodyTypes>>();

  const [token] = useState(() => {
    if (!localStorage.getItem("token")) {
      return null;
    } else {
      return jwt(localStorage.getItem("token")!) as TokenTypes;
    }
  });

  //get comments
  const getCommentHandler = async () => {
    try {
      const comments = await commentAPI.getComment(todoID);
      const commentsArray = comments.map((comment: any) => {
        return {
          commentid: comment._id,
          body: comment.body,
          creatorID: comment.creatorID,
          creatorName: comment.creatorName,
        };
      });

      const commentBodies = comments.map((comment: any) => {
        return {
          body: comment.body,
        };
      });
      setComments(commentsArray);
      setCommentBody(commentBodies);
    } catch (error) {
      console.log(error);
    }
  };

  //add comments
  const addCommentHandler = async () => {
    if (token === null) return window.alert("Please login first");

    const comment = document.getElementById(
      "add_comment_input"
    ) as HTMLInputElement;

    if (comment.value === "") return window.alert("Comment cannot be empty");

    const res = await commentAPI.addComment(
      todoID,
      comment.value,
      token.userid!,
      token.username!
    );
  };

  //update comments
  const updateCommentHandler = async (commentid: string, index: number) => {
    if (commentBody![index].body === "")
      return window.alert("Can update a comment into empty");

    const res = await commentAPI.updateComment(
      commentid,
      commentBody![index].body
    );
  };

  //delete comments
  const deleteCommentHandler = async (commentid: string, todoid: String) => {
    const res = await commentAPI.deleteComment(commentid, todoid);
  };

  useEffect(() => {
    if (todoID !== "") {
      getCommentHandler();
    }
  }, [todoID]);

  return (
    <div className="relative h-full w-full overflow-hidden overflow-y-auto">
      <div className="relative h-[70px] w-[95%] flex flex-col items-end justify-between">
        <input
          type="text"
          placeholder="Add Comment"
          id="add_comment_input"
          className="relative h-[35px] w-full text-[10px] outline-none bg-transparent border-b-[1px] border-b-black pl-[5px] sm:text-[14px]"
        />
        <button
          className="h-[20px] w-[75px] mb-[5%] bg-[#434343] text-[8px] text-white sm:h-[30px] sm:w-[100px] sm:text-[12px] sm:mb-0"
          onClick={() => addCommentHandler()}
        >
          Add Comment
        </button>
      </div>
      {comments?.length === 0 ? (
        <></>
      ) : (
        comments?.map((comment: CommentTypes, index: number) => {
          return (
            <div
              className="relative max-h-[165px] w-[95%] mt-[15px] flex flex-col items-end justify-between"
              key={`${comment}${index}`}
            >
              <div className="h-full w-full flex flex-row items-center justify-between">
                <div className="max-w-[20%] flex items-center justify-center">
                  <p className="font-bold">{comment.creatorName}:</p>
                </div>
                <textarea
                  id="update_comment_input"
                  value={
                    commentBody === undefined ? "" : commentBody[index].body
                  }
                  readOnly={
                    token === null || token.userid !== comment.creatorID
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    const updatedComment = { ...comment, body: e.target.value };
                    const updatedComments = comments?.map((originalComment) =>
                      originalComment.commentid === comment.commentid
                        ? updatedComment
                        : originalComment
                    );
                    setCommentBody(updatedComments);
                  }}
                  className="relative max-h-[110px] text-[10px] w-[80%] border-[1px] border-black bg-transparent pl-[5px] outline-none my-[10px] sm:text-[14px]"
                ></textarea>
              </div>
              <div className="flex flex-row items-center justify-between">
                {token === null || token.userid !== comment.creatorID ? (
                  <></>
                ) : (
                  <button
                    className="relative h-[20px] w-[65px] text-[8px] outline-none bg-[#434343] text-white mx-[5px] sm:h-[30px] sm:w-[100px] sm:text-[12px]"
                    onClick={() =>
                      updateCommentHandler(comment.commentid, index)
                    }
                  >
                    Update
                  </button>
                )}
                {token === null || todoCreator !== token.userid ? (
                  <></>
                ) : (
                  <button
                    className="relative h-[20px] w-[65px] text-[8px] outline-none bg-[#434343] text-white mx-[5px] sm:h-[30px] sm:w-[100px] sm:text-[12px]"
                    onClick={() =>
                      deleteCommentHandler(comment.commentid, todoID)
                    }
                  >
                    Delete
                  </button>
                )}

                {token === null ? (
                  <></>
                ) : todoCreator !== token.userid &&
                  token.userid === comment.creatorID ? (
                  <button
                    className="relative h-[20px] w-[65px] text-[8px] outline-none bg-[#434343] text-white mx-[5px] sm:h-[30px] sm:w-[100px] sm:text-[12px]"
                    onClick={() =>
                      deleteCommentHandler(comment.commentid, todoID)
                    }
                  >
                    Delete
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommentSection;
