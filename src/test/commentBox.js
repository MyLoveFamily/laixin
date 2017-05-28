import React, { Component } from 'react'
import CommentList from './commentList'
import CommentForm from './commentForm'
import $ from 'jquery';

class CommentBox extends Component {
    componentDidMount() {
        let url = 'http://127.0.0.1:8088/list_user';
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function(data) {
                console.log('success');
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }
    render () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        )
    }
}
export default CommentBox;