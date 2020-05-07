import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button';


const ImagesCarousel = (props)=>{
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
                                    <h1 style={{color:'#000'}}>{props.screenshotsNames[key]}</h1>
                                </Carousel.Caption>
                            )
                        }
                        <Carousel.Caption>
                            {props.title ==='Screenshots'&&
                                <Button style={{margin:'20px auto'}} onClick={()=>props.ChangedPic(image)} variant="danger">
                                    מחיקה
                                </Button>
                            }
                        </Carousel.Caption>
                        
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