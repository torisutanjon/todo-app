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
    <div className="relative h-full w-[75%] ml-[5%] overflow-hidden overflow-y-auto">
      <div className="relative h-[35px] w-full my-[10px] flex flex-row items-center justify-between">
        <div className="relative h-full w-[75%] rounded-[4px] overflow-hidden">
          <input
            type="text"
            placeholder="Add Comment"
            id="add_comment_input"
            className="relative h-full w-full outline-none bg-transparent border-b-[2px] border-b-[#8F43EE] pl-[5px] text-[14px]"
          />
        </div>
        <button
          className="relative mr-[10px] h-[25px] w-[100px] text-[12px] outline-none border-[1px] border-[#8F43EE] rounded-[50px] hover:bg-[#8F43EE] hover:text-[white]"
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
              className="relative h-[75px] w-full my-[15px] flex flex-row"
              key={comment.commentid}
            >
              <div className="relative h-full w-[75%] rounded-[4px] border-[1px] border-[#8F43EE] flex flex-col justify-evenly overflow-y-auto">
                <input
                  type="text"
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
                  className="relative h-[35px] w-2/3 border-b-[1px] border-b-[#8F43EE] bg-transparent ml-[5px] pl-[5px] outline-none"
                />
                <p className="self-end m-[10px]">By: {comment.creatorName}</p>
              </div>
              <div className="relative h-[full] w-[25%] flex flex-col items-center justify-start">
                {token === null || token.userid !== comment.creatorID ? (
                  <></>
                ) : (
                  <button
                    className="relative mr-[10px] h-[25px] w-[100px] text-[12px] outline-none border-[1px] border-[#8F43EE] rounded-[50px] hover:bg-[#8F43EE] hover:text-[white] mb-[15px]"
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
                    className="relative mr-[10px] h-[25px] w-[100px] text-[12px] outline-none border-[1px] border-[#8F43EE] rounded-[50px] hover:bg-[#8F43EE] hover:text-[white]"
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
                    className="relative mr-[10px] h-[25px] w-[100px] text-[12px] outline-none border-[1px] border-[#8F43EE] rounded-[50px] hover:bg-[#8F43EE] hover:text-[white]"
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
