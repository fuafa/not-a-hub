import React, { useEffect } from 'react';
import { connect, MapDispatchToPropsNonObject } from 'react-redux';
import { Dispatch, iRootState } from './store';
import ContributionItem from './ContributionItem';
import { RouteComponentProps } from 'react-router-dom';

const mapState = (state: iRootState) => ({
  issuesAndPRs: state.issuesAndPRs,
  posts: state.posts
});

const mapDispatch = (dispatch: Dispatch) => ({
  // TODO: getFeeds 的类型不对。。。
  getFeedsAll: () => dispatch.issuesAndPRs.getFeeds(),
  // test: () => dispatch
});

type MapDispatchProps = {
  getFeedsAll(): Promise<void>
}
const Contribution: React.SFC<RouteComponentProps & ReturnType<typeof mapState> & MapDispatchProps> = (props) => {
  useEffect(() => {
    props.getFeedsAll();
  });
  return (
    <ul style={{
      border: '1px solid #ccc',
      padding: 0,
      width: '660px'
    }}>
      {props.issuesAndPRs ? props.issuesAndPRs.items.map(item => (
        <ContributionItem {...item} key={item.url}></ContributionItem>
      )) : 'no items'}
    </ul>
  );
};

// TODO: (dispatch: Dispatch) => xxx 不兼容 (dispatch: Action) => xxx;
export default connect(mapState, mapDispatch as unknown as MapDispatchToPropsNonObject<MapDispatchProps, {}>)(Contribution);