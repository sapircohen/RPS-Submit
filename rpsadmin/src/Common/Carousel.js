import React,{Component} from "react";
import Carousel from 'react-bootstrap/Carousel'


const ImagesCarousel = (props)=>{
    console.log(props.images)
    
    
        
       if(props.images !==null){
           if (props.images !== undefined) {
            return(
                    <Carousel>
                        {props.images.map((image)=>   
                        
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={image}
                                alt="First preview"
                                />
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