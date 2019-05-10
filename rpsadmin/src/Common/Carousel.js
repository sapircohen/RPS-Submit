import React,{Component} from "react";
import Carousel from 'react-bootstrap/Carousel'


const ImagesCarousel = (props)=>{
    console.log(props.images) 
    if(props.images !==null){
        if (props.images !== undefined) {
        return(
            <Carousel>
                {props.images.map((image,key)=>   
                    <Carousel.Item>
                        <img
                        //height={400}
                        className="d-block w-100"
                        src={image}
                        alt="First preview"
                        />
                        {
                            props.screenshotsNames&&
                            (
                                <Carousel.Caption>
                                    <h1 style={{color:'#fff'}}>{props.screenshotsNames[key]}</h1>
                                </Carousel.Caption>
                            )
                        }
                    </Carousel.Item>
                )}
            </Carousel>
        )
        }
    }
        return(
            <div dir="rtl" style={{textAlign:'center'}}>
               לא העלאת תמונות...
            </div>
        )
    
}

export default ImagesCarousel;