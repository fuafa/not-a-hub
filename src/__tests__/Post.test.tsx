import React from 'react';
// import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import App from '../Post';
import Posts from '../out/PostList.json';

test('wtf', () => {
  const component = renderer.create(
    <MemoryRouter initialEntries={['/post/SubTyping']}>
      <App {...Posts[8]}></App>
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});