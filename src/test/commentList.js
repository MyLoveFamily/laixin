import React, { Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
    render () {
        var data = [
            {id: 1, author: "Pete Hunt", text: "This is one comment"},
            {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
        ];
        var commentNodes = data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )
    }
}
export default CommentList;