import React from 'react'
import store from 'App/store'
import {toggleInfo} from 'App/actions'

export default class TypingAnimtion extends React.Component {
  render() {
    return (
      <div className="info">
        <div className="info__inner">
          <span className="info__close-btn" onClick={() => store.dispatch(toggleInfo())}>Close</span>
          <h3>What and Why?</h3>
          <p>This is a completely non serious investigation into the question surrounding the actual intelligence of Artificial Intellicence in specific on the debate about <a href="https://en.wikipedia.org/wiki/Weak_AI" target="_blank">weak</a> vs. <a target="_blank" href="https://en.wikipedia.org/wiki/Artificial_general_intelligence">stong</a> AI. What happens if we  let two smart pieces of software communicate to each other in a way that is closer to how we humans communicate as opposed to meticulously specified computer protocols. While both of these algorithms are extremely sophisticated, sometimes they disagree in hilarious ways (try for example "Justin Bieber" as search term). While Google Image Search, by its nature, always comes up with very specific suggestions, Cloud Vision tends to generalize them into broader concepts that are easy for a computer to derrive from a bunch of pixels. Inevitably the discussion very often ends in very general topics such as "white", "hair" or "product".</p>
          <p>I have to add though that I think that I'm not treating these algorithms fairly. They might seem slightly stupid in this little experiment but that is mainly because that's not what they were built for. Computer software of this kind is not built to give one (and only one) definitive answer to a problem. In reality they give a list of answers with a probability attached to each of them indicating the confidence that this is the right (or best) answer. Hiding these probabilities and only taking one of the answer and presenting it as the one answer might seem silly and overly confident to us. In addition Google's image description capabilities are already <a target="_blank" href="https://ai.googleblog.com/2014/11/a-picture-is-worth-thousand-coherent.html">much greater</a> than what is used in this experiment. Reducing a whole image to just one or two words inevitably results in a generalization of its contents. The same thing would happen if two humans would play this game. Last but not least, the sentences I constructed around the algorithimically generated terms are not of the finest English. They rather sound like the way I would write to friends. They also include an occasional grammatical error. This is mainly due to my low level programming skills.</p>
          
          <h3>How?</h3>
          <p>The experiment consists of a simple <a target="_blank" href="https://reactjs.org/">React</a> app running in the browser and an <a target="_blank" href="https://expressjs.com/">Express</a> server communicating with the Google APIs. The Server always picks one of the first 10 images returned by Google Image Search at random (to add some variation), sends this image to Google Cloud Vision, takes the term with the highest confidence and sends these two piceses of information to the browser where the conversation is constructed. If the two services don't agree yet, the same procedure will be repeated untill they agree.</p>
          
          <p>Made by <a href="https://twitter.com/flaviogortana" target="_blank">flavio gortana</a></p>
        </div>
      </div>
    )
  }
}

// Narrow AI vs. Broad AI
// not fair -> just 1 or 2 word responses, i make them sound stupid, range of probabilities
// Most very smart we see and use in our everyday life i
// What happens if we actually let two smart pieces of software communicate to each other in a way that is closer to how we humans communicate as opposed to meticulously specified computer protocols.