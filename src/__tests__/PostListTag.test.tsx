import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import App from '../PostList';
import Posts from '../out/PostList.json';

test('should render all posts', () => {
  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <App
        posts={[...Posts].filter(post => post.tags.includes('TypeScript'))}
        _color={'blue'}
        match={{
          isExact: true,
          params: {},
          path: '/',
          url: '/'
        }}
        history={{} as any}
        location={{} as any}
      ></App>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
