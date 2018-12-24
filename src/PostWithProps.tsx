import React from 'react'
import ReactMarkdown from 'react-markdown'
import 'highlight.js/styles/atom-one-light.css'
import './Post.css'
import { Link } from 'react-router-dom';

export interface PostProps {
  content: string
  title: string
  url: string
  tags: string[]
  date: string
  author: string
  desc: string
  type: string
  cover?: string
}

export default class Post extends React.Component<PostProps> {
	componentDidMount() {
    this.refleshBlock()
  }
  componentDidUpdate() {
    this.refleshBlock()
  }
  refleshBlock() {
    import('highlight.js').then(hljs => {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block)
      })
    })
  }
  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        <div className="mata">
          <span><Link to="/" className="mata-link">{this.props.author}</Link></span>
          <span>|</span>
          <span>{this.props.date}</span>
          <span>|</span>
          {this.props.tags.map(tag => (
            <span key={tag}><Link to="/" className="mata-link">#{tag}</Link></span>
          ))}
        </div>
        <blockquote>{this.props.desc}</blockquote>
        <ReactMarkdown source={this.props.content}/>
      </>
    )
  }
}