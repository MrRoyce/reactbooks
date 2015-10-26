'use strict';

var post = {
    title: 'React v0.5',
    content: 'This release is the result of several months of hard work from members of the team and the community.',
    comments: ['Great work team!', 'Does not work on my machine.', 'What is this react?', 'new comment']
};

var Post = React.createClass({
    displayName: 'Post',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                this.props.data.title
            ),
            React.createElement(
                'p',
                null,
                this.props.data.content
            ),
            React.createElement(
                'h2',
                null,
                'Comments'
            ),
            this.props.data.comments.map(function (comment) {
                return React.createElement(Comment, { content: comment });
            })
        );
    }
});

var Comment = React.createClass({
    displayName: 'Comment',

    render: function render() {
        return React.createElement(
            'div',
            null,
            this.props.content
        );
    }
});

React.render(React.createElement(Post, { data: post }), document.body);