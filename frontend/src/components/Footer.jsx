import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {

  const changeActive = (e) => {
    e.target.parentNode.classList.add('active')
    e.target.parentNode.parentNode.childNodes.forEach((child) => {
      if (child !== e.target.parentNode) {
        child.classList.remove('active')
      }
    })
  }

  const showbot = () => {
    window.botpressWebChat.sendEvent({ type: 'show' })
  };

  return (
    <div className='footer'>
      <Link to='/' onClick={changeActive} className="footer_option active">
        <img src={require("../images/icons/home.png")} className='footer_logo'/>
        <span className="option_title">Home</span>
      </Link>
      <Link to='/scan' onClick={changeActive} className="footer_option">
        <img src={require("../images/icons/scan.png")} className='footer_logo'/>
        <span className="option_title">Scan</span>
      </Link>
      {/* <Link to='/locate' onClick={changeActive} className="footer_option">
        <img src={require("../images/icons/locate.png")} className='footer_logo'/>
        <span className="option_title">Locate</span>
      </Link> */}
      <Link to='/cart' onClick={changeActive} className="footer_option">
        <img src={require("../images/icons/cart.png")} className='footer_logo'/>
        <span className="option_title">Cart</span>
      </Link>
      <div onClick={showbot} className="footer_option ai_assist">
        <img src={require("../images/icons/assist.png")} className='footer_logo ai_assist_icon'/>
        <span className="option_title">Ai Assist</span>
      </div>
    </div>
  )
}
