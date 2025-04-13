import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import gsap from 'gsap'
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';

const NavBar = () => {
  
  const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  const [isAudioPlaying,setIsAudioPlaying] = useState(false)
  const [isIndicatiorActive,setIsIndicatiorActive] = useState(false)
  
  const { y : currentScrollY} = useWindowScroll();
  const [isNavVisbile,setIsNavVisbile] = useState(true)
  const [lastScrollY,setLastScrollY] = useState(0)

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const toggleAudioIndicator= ()=>{
    setIsAudioPlaying((audio)=> !audio);
    setIsIndicatiorActive((audio)=> !audio);
  }

  useEffect(()=>{
    if(isAudioPlaying){
      audioElementRef.current.play();
    }
    else{
      audioElementRef.current.pause();
    }
  },[isAudioPlaying])

  useEffect(()=>{
    if(currentScrollY===0){
      // show navbar without floating-nav
      setIsNavVisbile(true);
      navContainerRef.current.classList.remove('floating-nav');
    }else if(currentScrollY>lastScrollY){
      // hide navbar and apply floating-nav
      setIsNavVisbile(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if(currentScrollY<lastScrollY){
      // show navbar with floating-nav
      setIsNavVisbile(true);
      navContainerRef.current.classList.add('floating-nav');
    }
    setLastScrollY(currentScrollY)
  },[currentScrollY,lastScrollY])

  useEffect(()=>{
    gsap.to(navContainerRef.current,{
      y: isNavVisbile ? 0 : -50,
      opacity: isNavVisbile ? 1 : 0,
      duration: 0.1,
    })
  },[isNavVisbile])


  return (
    <div ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src='/img/logo.png' alt='logo' className='w-10'/>
            <Button
              id='product-button'
              title='product-title'
              rightIcon={<TiLocationArrow/>}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item,index)=>(
                <a  key={index} 
                    className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <button onClick={toggleAudioIndicator} className="ml-10 flex items-center space-x-0.5">
            <audio ref={audioElementRef}
                   className='hidden'
                   src='/audio/loop.mp3'
                   loop
                   autoPlay
                   muted
            />
            {[1,2,3,4].map((bar)=>(
              <div
                key={bar}
                className={`indicator-line ${isIndicatiorActive ? 'active':''}`}
                style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
              />
            ))}
          </button>
        </nav>
      </header>
    </div>
  )
}

export default NavBar