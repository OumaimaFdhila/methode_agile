"use client"
import AddCommentArea from "./addCommentArea";
import { CommentProvider } from "./commentsProvider";
import CommentsArea from "./commentsArea";

export default function CommentsComponent() {

    return (
        <CommentProvider>
            <AddCommentArea/>
            <CommentsArea/>
        </CommentProvider>
    );
}