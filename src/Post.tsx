import React from 'react'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

export default class Post extends React.Component<{}> {
  componentDidMount() {
    // import('highlight.js').then(() => {
    // 	document.querySelectorAll('pre code').forEach(block => {
    // 		hljs.highlightBlock(block)
    // 	})
    // })

    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block)
    })
  }
  render() {
    return <ReactMarkdown source={`%markdown inject%`} />
  }
}
