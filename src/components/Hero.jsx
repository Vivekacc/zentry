// import React from 'react'

import { useState,useRef,useEffect } from "react"
import gsap from "gsap";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import {ScrollTrigger} from "gsap/all";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

    const [currentIndex,setCurrentIndex]= useState(1);
    const [hasClicked,setHasClicked]= useState(false);
    const [isLoading,setIsLoading]= useState(true);
    const [loadedViedo,setLoadedVideo]= useState(0);

    const totalVideo = 8;

    const nextVdRef = useRef(null)

    const handelVideoLoad = () =>{
        setLoadedVideo((prev) => prev + 1 )
    
    }

    const upcomingVideo = (currentIndex % totalVideo) + 2;
    const currentVideo = currentIndex ;
    const newSrc = (currentIndex === totalVideo) - 1 ? 1 : currentIndex;

    useEffect(()=>{
        if(loadedViedo === totalVideo - 8){
            setIsLoading(false)
        }
    },[loadedViedo])

    const handelMiniVideoPlayer=()=>{

        setHasClicked(true);
        setCurrentIndex(upcomingVideo);

    }


    useGSAP(()=>{
        if(hasClicked){
            gsap.set('#next-video',{visibility:'visible'});
           
            gsap.from('#current-video',{
                transformOrigin:'center center',
                scale:0.3,
                duration:1.5,
                ease:'power1.inOut'
            })
            
            gsap.to('#next-video',{
                transformOrigin:'center center',
                scale:1,
                width:'100%',
                height:'100%',
                duration:1,
                ease:'power1.inOut',
                onStart:()=> nextVdRef.current.play(),
            })

        }
    },{ dependencies:[currentIndex],
        revertOnUpdate:true});

        useGSAP(() => {
            gsap.set('#video-frame', {  
            clipPath: "polygon(14% 0, 72% 0, 88% 80%, 0% 95%)",        
              borderRadius: "0% 0% 80% 50%",
            });
            gsap.from('#video-frame', {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              borderRadius: "0% 0% 0% 0%",
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
              },
            });
          });
        

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (    
    <div className="relative h-dvh w-screen overflow-x-hidden">
        {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
            )}
        <div id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <div>
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div onClick={handelMiniVideoPlayer} className="origin-center  scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"> 
                        <video  ref={nextVdRef}
                                src={getVideoSrc(upcomingVideo)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handelVideoLoad}
                                
                        />
                    </div>
                </div>
                <video  ref={nextVdRef}
                        src={getVideoSrc(currentVideo)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handelVideoLoad}
                />
                <video  src={getVideoSrc(newSrc)}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handelVideoLoad}
                />
            </div>
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>A</b>MING
                </h1>
                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                        redefi<b>n</b>e
                        </h1>

                        <p className="mb-5 max-w-64 z-40 font-robert-regular text-blue-100">
                        Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button id="watch-trailer"
                                title="Watch trailer"
                                leftIcon={<TiLocationArrow />}
                                containerClass="!bg-yellow-300 flex-center gap-1"/>
                    </div>
                </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
            G<b>A</b>MING
        </h1>
        <div className="absolute left-0 top-0 z-0 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-black">
                        redefi<b>n</b>e
                        </h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-black">
                        Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button id="watch-trailer"
                                title="Watch trailer"
                                leftIcon={<TiLocationArrow />}
                                containerClass="!bg-yellow-300 flex-center gap-1"/>
                    </div>
        </div>
    </div>
  )
}

export default Hero