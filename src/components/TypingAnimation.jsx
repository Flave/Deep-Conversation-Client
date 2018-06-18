import React from 'react'

export default ({speaker}) => (
  <div className={`typing typing--${speaker}`}>
    <span className="typing-bubble typing-bubble--1"/>
    <span className="typing-bubble typing-bubble--2"/>
    <span className="typing-bubble typing-bubble--3"/>
  </div>
)