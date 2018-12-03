import React from 'react'
import lifeCycle from './react-lifecycle.png'

const FAQ: React.SFC<{}> = props => {
  return (
    <div>
      <ol>
        <li>
          <div>React 生命周期：</div>
          <div>
            <img src={lifeCycle} alt="" />
          </div>
        </li>
        <li>
          <div>React this.setState notes:</div>
          <ul>
            <li>两种调用方式：</li>
            <li>this.setState({'{}'}): 同步</li>
            <li>this.setState((state, props) => ({'{}'})): 异步</li>
          </ul>
        </li>
      </ol>
    </div>
  )
}

export default FAQ
