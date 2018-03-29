import React from 'react'

const capitalize = (str) => {
  return (str && str.length) && str[0].toUpperCase() + str.slice(1)
}

// 🙈  🙊  💩  🤓  😤  🙃  😛  🤔  😄  🙄  😩  👀  ❤ 🙄

const messagesCache = new Map()

export const getMessage = ({speaker, step, query, label, id}) => {
  const vowels = ['a', 'e', 'i', 'o'];
  const lcQuery = query && query.toLowerCase();
  const queryArticle = query && vowels.indexOf(query[0]) > -1 ? 'an' : 'a';
  const lcLabel = label && label.toLowerCase();
  const labelArticle = label && vowels.indexOf(label[0]) > -1 ? 'an' : 'a';
  const queryEl = query && <span className="message__query">{query}</span>;
  const labelEl = label && <span className="message__label">{label}</span>;

  const messages = {
    VISION: {
      PRE_START: [
        <span>You ask me what this picture could conceal? Not an easy task to master 🤔</span>,
        <span>R U sure this is the picture you want us to talk about? I'll do my best.</span>,
        <span>Nice pixels! Gimme a second to decode them.</span>,
      ],
      START: [
        <span>Well I'm telling you I can definitely see {labelArticle} {labelEl} in there!</span>,
        <span>Uh I would say this is {labelArticle} {labelEl}. What a beautiful {labelArticle} {labelEl} this is!</span>,
        <span>Now this is a tricky one. But if I stare at it for some time I think I can recognize {labelArticle} {labelEl} in there.</span>,
      ],
      CONVERSATION: [
        <span>{capitalize(queryArticle)} {queryEl}? 😂 To me this looks more like {labelArticle} {labelEl}</span>,
        <span>{capitalize(queryArticle)} {queryEl}? R U kidding? I think I can rather see signs of {labelArticle} {labelEl} in there</span>,
        <span>Now you're being delusional 🙃🙃🙃. This definitely is {labelArticle} {labelEl}</span>,
        <span>Depending from what angle you look at it. Maybe. But I would rather go with "{labelEl}"</span>,
        <span>Haha...not in a million years. Clearly this is {labelArticle} {labelEl}</span>,
      ],
      END: [
        <span>Yes I kind of agree. This definitely looks like {labelArticle} {labelEl}</span>,
        <span>Aight, now we're talking. I agree. This is what a proper {labelEl} looks like.</span>,
        <span>Finally you're starting to make sense. {labelArticle} {labelEl} sounds like a good guess.</span>
      ],
      LOOP: [
        <span>To me this looks more like {labelArticle} {labelEl} again. Maybe we should wrap this up. I don't feel like we're getting anywhere.</span>
      ]
    },
  
    SEARCH: {
      PRE_START: [
        <span>You want to know what {queryArticle} {queryEl} might look like?</span>,
        <span>WTF is {queryArticle} {queryEl} supposed to be? I see whether I can find something 🤔</span>,
        <span>{queryArticle} {queryEl}? That's an easy one. One sec...</span>
      ],
      START: [
        <span>If you ask me this is what {queryArticle} {queryEl} looks like</span>,
        <span>Here we go. {capitalize(queryArticle)} {queryEl}. What a beautiful specimen of {capitalize(queryArticle)} {queryEl} this is</span>
      ],
      CONVERSATION: [
        <span>{capitalize(queryArticle)} {queryEl}? Sure 😘! In my world at least {queryArticle} {queryEl} looks like this</span>,
        <span>And they call you a "Superbrain"? I would say this one comes closer to {queryArticle} {queryEl}</span>,
        <span>Seriously but now we are just splitting hairs. {capitalize(queryArticle)} {queryEl} clearly looks like this </span>,
        <span>That's you 🙈! {capitalize(queryArticle)} {queryEl} is better depicted by something this </span>,
        <span>Hahaha...you cannot make this 💩 up! Where I'm from {queryArticle} {queryEl} looks like this</span>,
        <span>Your parents clearly did something wrong if you seriously think this is {queryArticle} {queryEl}. I've been told that a {queryArticle} {queryEl} looks like this  </span>
      ],
      END: [
        <span>Finally you're starting to make sense ❤. {queryArticle} {queryEl} sounds like a good guess.</span>,
        <span>Cool! I'm really glad that we can at least agree on what {queryArticle} {queryEl} looks like.</span>
      ],
      LOOP: [
        <span>Man, looks to me like we're moving in circles&hellip; Let's agree to disagree</span>,
        <span>Yep you've said this before 🙃. I don't see this discussion going anywhere useful</span>
      ]
    }
  }
  let message = messagesCache.get(id);
  if(message) {
    return message;
  }

  const messageGroup = messages[speaker][step];
  message = messageGroup[Math.floor(Math.random() * messageGroup.length)];
  messagesCache.set(id, message);
  return message;
}


