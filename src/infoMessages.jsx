import React from 'react'
// ⬇
export const startMessage = <span>🗯 Give them something to talk about Either enter a <b>search term</b> or upload an <b>image</b></span>

export const restartMessages = (lastMessage) => {
  const messages = {
    LOOP: [<span>Looks like they came close to an agreement but were undecided about the details. Wanna try again?</span>],
    END: [<span>Looks like they came to an agreement. Wanna go again?</span>],
    NO_IMAGES_FOUND: [<span>💥Looks like Search has trouble getting started talking about <b>{lastMessage.query}</b>. How about entering a topic that actually exists?</span>]
  }
  return messages[lastMessage.step][0]
}