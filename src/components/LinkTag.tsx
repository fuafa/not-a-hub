import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { COLORS } from '../shared/constant';

interface Props {
  tag: string;
  className: string;
  color?: string;
}

const LinkTag: React.SFC<Props> = (props) => {
  return (
    <Link
      to={`/tag/${props.tag.toLowerCase()}`}
      className={props.className}
      key={props.tag}
    >
      <Tag color={props.color || COLORS[Math.floor(Math.random() * COLORS.length)]} style={{cursor: 'pointer'}}>{props.tag}</Tag>
    </Link>
  );
};

export default LinkTag;