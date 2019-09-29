import React from 'react';
import {css as emoCSS} from 'emotion';
import styled from 'react-emotion';
import matchSorter from 'match-sorter';

const allItems = [
  {
    id: 1,
    title: 'In The Secret',
    verses: [
      'In the secret, in the quiet place.\nIn the stillness You are there.\nIn the secret, in the quiet hour\nI wait, only for You.\nCause I want to know You more.',
      'I want to know You,\nI want to hear Your voice.\nI want to know You more.\nI want to touch You.\nI want to see Your face.\nI want to know You more.',
      'I am reaching, for the highest goal,\nThat I might receive the prize.\nPressing onward,\nPushing every hindrance aside\nOut of my way.\nCause I want to know You more.'
    ]
  },
  {
    id: 2,
    title: 'God of Wonders',
    verses: [
      'Lord of all creation\nOf water, earth and sky\nHeavens are Your tabernacle\nGlory to the Lord on high.',
      'God of wonders beyond our galaxy\nYou are holy, holy.\nThe universe declares Your majesty\nYou are holy, holy.\nLord of heaven and earth. (echo)',
      'Early in the morning\nI will celebrate the light.\nWhen I stumble in the darkness\nI will call You name by night.',
      'Hallelujah to the Lord of heaven\nand earth.'
    ]
  },
  {
    id: 3,
    title: 'Father of Lights',
    verses: [
      'Father of lights,\nYou delight in Your children\nFather of lights,\nYou delight in Your children\n',
      'Every good and perfect gift comes from You\nEvery good and perfect gift comes from You\nEvery good and perfect gift comes from You\nFather of Lights.',
      'Father of lights, You never change,\nYou have no turning.\nFather of lights, You never change,\nYou have no turning.'
    ]
  },
  {
    id: 4,
    title: 'Jesus Lover of My Soul (It’s All About You)',
    verses: [
      'It’s all about You, Jesus.\nAnd all this is for You,\nFor Your glory and Your fame.',
      'It’s not about me;\nAs if You should do things my way.\nYou alone are God,\nAnd I surrender to Your ways.',
      'Jesus, lover of my soul\nAll consuming fire is in Your gaze.\nJesus, I want You to know\nI will follow You all my days.',
      'For no one else in history is like you\nAnd history itself belongs to You\nAlpha and Omega,\nYou have loved me,\nAnd I will share eternity with You'
    ]
  }];

const css = (...args) => ({className: emoCSS(...args)});

const Item = styled('li')(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    height: 'auto',
    textAlign: 'left',
    borderTop: 'none',
    lineHeight: '1em',
    color: 'rgba(0,0,0,.87)',
    fontSize: '1rem',
    textTransform: 'none',
    fontWeight: '400',
    boxShadow: 'none',
    padding: '.8rem 1.1rem',
    whiteSpace: 'normal',
    wordWrap: 'normal',
  },
  ({isActive, isSelected}) => {
    const styles = [];
    if (isActive) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        background: 'rgba(0,0,0,.03)',
      });
    }
    if (isSelected) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        fontWeight: '700',
      });
    }
    return styles;
  },
);
const onAttention = '&:hover, &:focus';
const Input = styled('input')(
  {
    width: '100%', // full width - icon width/2 - border
    fontSize: 14,
    wordWrap: 'break-word',
    lineHeight: '1em',
    outline: 0,
    whiteSpace: 'normal',
    minHeight: '2em',
    background: '#fff',
    display: 'inline-block',
    padding: '1em 2em 1em 1em',
    color: 'rgba(0,0,0,.87)',
    boxShadow: 'none',
    border: '1px solid rgba(34,36,38,.15)',
    borderRadius: '.30rem',
    transition: 'box-shadow .1s ease,width .1s ease',
    [onAttention]: {
      borderColor: '#99d',
      boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
    },
  },
  ({isOpen}) =>
    isOpen
      ? {
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        [onAttention]: {
          boxShadow: 'none',
        },
      }
      : null,
);

const Label = styled('label')({
  fontWeight: 'bold',
  display: 'block',
  marginBottom: 10,
});

const BaseMenu = styled('ul')(
  {
    padding: 0,
    marginTop: 0,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    width: '100%',
    maxHeight: '20rem',
    overflowY: 'auto',
    overflowX: 'hidden',
    outline: '0',
    transition: 'opacity .1s ease',
    borderRadius: '0 0 .28571429rem .28571429rem',
    boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
    borderColor: '#99d',
    borderTopWidth: '0',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid',
  },
  ({isOpen}) => ({
    border: isOpen ? null : 'none',
  }),
);

const Menu = React.forwardRef((props, ref) => (
  <BaseMenu innerRef={ref} {...props} />
));

const ControllerButton = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  cursor: 'pointer',
  width: 47,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : undefined}
    >
      <path d="M1,6 L10,15 L19,6"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
    >
      <path d="M1,1 L19,19"/>
      <path d="M19,1 L1,19"/>
    </svg>
  );
}

function getItems(filter) {
  return filter
    ? matchSorter(allItems, filter, {
      keys: ['title', 'verses'],
    })
    : allItems;
}

function getStringItems(filter) {
  return getItems(filter).map(({name}) => name);
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function getItemsAsync(filter, {reject}) {
  // await sleep(Math.random() * 2000);
  if (reject) {
    // this is just so we can have examples that show what happens
    // when there's a request failure.
    throw new Error({error: 'request rejected'});
  }
  return getItems(filter);
}

export {
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  Label,
  css,
  getItems,
  getStringItems,
  getItemsAsync,
};
