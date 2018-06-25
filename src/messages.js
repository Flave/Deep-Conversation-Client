import React, {Component} from 'react';
import { capitalize } from 'App/utils';
import { randomNormal } from 'd3-random';

// 🙈  🙊  💩  🤓  😤  🙃  😛  🤔  😄  🙄  😩  👀  ❤ 🙄

const messagesCache = new Map();
const vowels = ['a', 'e', 'i', 'o'];

const getRandomNormalIndex = (target, max, sigma = 2) => {
  const index = Math.floor(randomNormal(target, sigma)());
  if(index < 0 || index > max) return getRandomNormalIndex(target, max, sigma);
  return index;
}

const colors = ['#ff0000', '#00ff33', '#0033ff', '#ffff00', '#ff00ff', '#00ffff'];

const getArticle = (term, capitalized) => {
  let article = vowels.indexOf(term[0]) > -1 ? 'an' : 'a';
  article = term[term.length - 1].toLowerCase() === 's' ? '' : article;
  return capitalized ? capitalize(article) : article;
}

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorLetters: true
    }
  }
  componentDidMount() {
    this.animate();
  }
  animate() {
    this.startTime = new Date();
    this.setState({colorLetters: true});
    this.recolor();
  }  
  recolor() {
    const now = new Date();
    this.forceUpdate();
    if(now - this.startTime < 1200) {
      window.setTimeout(this.recolor.bind(this), 70);
    } else {
      this.setState({colorLetters: false});
    }
  }
  render() {
    const {term} = this.props;
    return (
      <a  className="message__term-link" target="_blank" href={`https://www.google.com/search?tbm=isch&q=${term}`}>
        <span onMouseEnter={this.animate.bind(this)} className="message__term-word">{term.split('').map((letter, i) => {
          let color = colors[Math.floor(Math.random() * colors.length)];
          color = this.state.colorLetters ? color : ''
          return <span key={i} style={{color}} className="message__term-letter">{letter}</span>
        })}</span>
      </a>
    )
  }
}

const Query = ({addArticle=true, capitalized=false, term}) => {
  const article = getArticle(term, capitalized);
  return <span className={'message__term message__term--query'}>
    {addArticle ? `${article} ` : ''}<Term term={term}/>
  </span>
}

const Label = ({addArticle=true, capitalized=false, term}) => {
  const article = getArticle(term, capitalized);
  return <span className={'message__term message__term--label'}>
    {addArticle ? `${article} ` : ''}<Term term={term}/>
  </span>
}

export const getMessage = ({speaker, step, query, label, id, stepIndex}) => {
  const messages = {
    VISION: {
      PRE_START: [
        <span>Just recently I was asked about this image</span>,
        <span>Someone uploaded this image recently and asked me what I see inthere.</span>,
      ],
      START: [
        <span>I don't know about you, but I'm almost sure I can see <Label term={label} /> in there.</span>,
        <span>There are a million ways to describe this image. But for simplicity sake, this is just <Label term={label} />.</span>,
        <span>How am I suppoed to know for sure?!! I'm quite sure I can see <Label term={label} /> in there though!</span>,
      ],
      CONVERSATION: [
        <span>Sure, if you want to be really specific. But I think you can also just call this <Label term={label}/></span>,
        <span>Good guess. But to me this looks more like <Label term={label} /></span>,
        <span>This is what you think <Query term={label} /> looks like? You're funny! I think this is supposed to be something like <Label term={label} /></span>,
        <span>Maybe. But I think this could also be <Label term={label} /></span>,
        <span>Depending from what angle you look at it. Maybe. But I would rather call this "<Label addArticle={false} term={label} />"</span>,
        <span>This is <Query term={query} /> according to you? 😂 To me this looks more like <Label term={label} /></span>,
        <span>This is what you think <Query term={query} /> looks like? R U kidding? I think I can rather see <Label term={label} /> in there</span>,
        <span>Right, and I am a sentient human being. This clearly is <Label term={label} /></span>,
        <span>Now you're being delusional 🙃. This definitely is <Label term={label} /></span>,
        <span>Haha...not in a million years. Clearly this is <Label term={label} /></span>,
        <span>If this is <Query term={query} /> I am a banana. It should be obvious to you that this is <Label term={label} /></span>,
        <span>How on earth do you see <Query term={query} /> inthere? Everything I can think of when I see this is <Label term={label} /></span>,
      ],
      END: [
        <span>Yes I kind of agree. This definitely looks like <Label term={label} /></span>,
        <span>Fair enough. I'll give you that one. This might actually be <Label term={label} /></span>,
        <span>I agree. To me this also looks like <Label term={label} /></span>,
        <span>Cool 👏. I'm really glad that we can at least agree on what <Query term={query} /> looks like.</span>,
        <span>Alright, now we're talking. I agree. This is what <Label addArticle={false} term={label} /> looks like.</span>,
        <span>Finally you're starting to make sense. <Label capitalized={true} term={label} /> sounds like a good guess.</span>
      ],
      LOOP: [
        <span>To me this looks more like <Label term={label} /> again. Maybe we should wrap this up. I don't feel like we're getting anywhere.</span>
      ]
    },
  
    SEARCH: {
      PRE_START: [
        <span>Just now for example someone wants to know what <Query term={query} /> looks like.</span>,
        <span>For example someone recently requested to have an image of <Query term={query} />.</span>,
        <span>The other day I got a request for an image of <Query term={query} />.</span>,
      ],
      START: [
        <span>So I came up with this one &hellip;</span>,
        <span>When I get asked something like that I usually just show them something like this.</span>,
        <span>I can find an image of <Query term={query} /> with my eyes closed</span>,
      ],
      CONVERSATION: [
        <span>Sure, this might be true. But then again this could be <Query term={query} /> as well.</span>,
        <span>Possibly. But actually I would say this comes closer to <Query term={query} /></span>,
        <span>Not really sure about that. When I think of <Query term={query} /> I think of something like this</span>,
        <span>I can see how you come to this conclusion but where I'm from, <Query term={query} /> looks like this</span>,
        <span>Yea...no not really 🙄. Maybe if you close one eye. But for me this comes closer to <Query term={query} /></span>,
        <span>I think you have the wrong concept of <Query term={query} />. If I'd have to bet money on it I would say <Query term={query} /> looks like this</span>,
        <span>Haha...you're joking, right?! 1 sec. I'll show you what <Query term={query} /> looks like.</span>,
        <span>Yeah sure...<Query term={query} capitalized={true} />! In my world at least <Query term={query} /> looks like this</span>,
        <span>And they call you a "Superbrain"? <Query capitalized={true} term={query} /> is better depicted by something like this</span>,
        <span>Seriously but now we are just splitting hairs. <Query term={query} capitalized={true} /> clearly looks like this </span>,
        <span>Have you ever considered buying a pair of glasses?! <Query term={query} capitalized={true} /> clearly looks like this </span>,
        <span>Hahaha...you cannot make this 💩 up! Where I'm from <Query term={query} /> looks like this</span>,
        <span>What's wrong with you?! In my world <Query term={query} /> looks like this</span>,
        <span>Your parents clearly did something wrong if you seriously think this is <Query term={query} /> 🤔 I've been told that a <Query term={query} /> looks like this  </span>
      ],
      END: [
        <span>Finally you're starting to make sense ❤. <Query term={query} /> sounds like a good guess.</span>,
        <span>Cool! I'm really glad that we can at least agree on what <Query term={query} /> looks like.</span>
      ],
      LOOP: [
        <span>Man, looks to me like we're moving in circles&hellip; Let's agree to disagree</span>,
        <span>Yep you've said this before 🙃. I don't see this discussion going anywhere useful</span>
      ]
    },

    ERROR: {
      NO_IMAGES_FOUND: [
        <span>Looks like Search has trouble getting started talking about <Query term={query} />. How about entering a topic that actually exists?</span>,
      ]
    }
  }
  let message = messagesCache.get(id);
  if(message) {
    return message;
  }


  const messageGroup = messages[speaker][step];
  const stepExceedsOptions = stepIndex >= messageGroup.length - 1;
  const target = stepExceedsOptions ? Math.floor(messageGroup.length * .75) : stepIndex;
  const sigma = stepExceedsOptions ? 2 : 4;
  const index = getRandomNormalIndex(target, messageGroup.length, sigma)
  message = messageGroup[Math.floor(Math.random() * messageGroup.length)];
  messagesCache.set(id, message);
  return message;
}


