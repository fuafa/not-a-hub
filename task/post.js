// @ts-check
const fs = require('fs')
// const path = require('path')
// const React = require('react')
// const ReactDOM = require('react-dom')
// const ReactMarkdown = require('react-markdown')
// const yaml = require('js-yaml')
const yamlFront = require('gray-matter')
// const diff = require('diff')

// import fs from "fs";
// import React from 'react'
// import ReactMarkdown from "react-markdown";

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
            const out = data.replace(
              '%markdown inject%',
              // delete matadata & escape `
              // md.slice(md.indexOf('---') !== -1 && md.indexOf('---', 2) + 3).replace(/`/g, '\\`')
              postObj.content.replace(/`/g, '\\`')
            )
            const outPath = path.replace('.md', '')

            /**
             * Generate tsx file for every md file
             * no need for now
             */
            // fs.writeFile(`${outPostsPath}/${outPath}.tsx`, out, err => {
            // 	if (!err) {
            // 		console.log(`Generate ${outPath}.tsx finished`)
            // 		return
            // 	}
            //   console.log(`Generate ${outPath}.tsx failed: ${err}`)
            //   reject(`An error accur when reading md file ${path} : ${err}`)
            // })

            resolve({
              ...postObj.data,
              content: postObj.content
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
