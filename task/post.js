// @ts-check
const fs = require('fs')
const yamlFront = require('gray-matter')
const hljs = require('highlight.js')
// const html2React = require('html-react-parser');
const mdIt = require('markdown-it')({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
})

const sourcePostsPath = './src/posts'
const outPostsPath = './src/out'
const postTemplatePath = './src/Post.tsx'
const files = fs.readdirSync(sourcePostsPath)

fs.readFile(postTemplatePath, 'utf8', (err, data) =>
  Promise.all(
    files.map(
      path =>
        new Promise((resolve, reject) =>
          fs.readFile(`${sourcePostsPath}/${path}`, 'utf8', (err, md) => {
            if (err) {
              reject(`An error accur when reading md file ${path} : ${err}`)
              return
            }
            const postObj = yamlFront(md)
            resolve({
              ...postObj.data,
              content: mdIt.render(postObj.content)
            })
          })
        )
    )
  ).then(posts => {
    /**
     * Generate PostList.json
     */
    fs.writeFile(
      `${outPostsPath}/PostList.json`,
      JSON.stringify(posts, null, 2),
      err => {
        if (err) {
          console.log(`An error accurs when updating PostList.json`)
        }
        console.log('Updated PostList.json')
      }
    )
  })
)
