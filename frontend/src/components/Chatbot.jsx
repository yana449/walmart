import React, { useEffect } from 'react'
import '../styles/Chatbot.css'

export default function Chatbot() {

  return (
    <div className="assist_container">
      <div id="bp-web-widget-container">
        <iframe id="bp-web-widget" title="This%20chatbot%20was%20built%20surprisingly%20fast%20with%20Botpress" className="bp-widget-web bp-widget-side webchatIframe" /* style="width: 100%;" */></iframe>
      </div>
    </div>
  )
}
