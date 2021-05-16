import React, {useState, useEffect} from 'react';
import QuotePrint from './QuotePrint';
import twitter from '.././media/twitter.png';

//`

const QuoteContainer = () => {

    const [data, setData] = useState(null);

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const [color1, setColor1] = useState(255);
    const [color2, setColor2] = useState(255);
    const [color3, setColor3] = useState(255);

    const [colorText, setColorText] = useState(0);

    const url = 'https://gist.githubusercontent.com/carmandomx/3d7ac5f15af87a587e1d25f5ba96de61/raw/e2d848b87c730a580077de221666343c15b1a243/gistfile1.txt';

    // const logo = require('.././media/twitter.png'); 

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(datos => setData(datos))
        setColor1(Math.round(Math.random()*254));
        setColor2(Math.round(Math.random()*254));
        setColor3(Math.round(Math.random()*254));
    }, []);

    useEffect(() => {
        if(data){
            getData();
        }
    }, [data]);

    const newQuote = () =>{
        getData();
        newBg();
    }

    const newBg = () => {
        setColor1(Math.round(Math.random()*254));
        setColor2(Math.round(Math.random()*254));
        setColor3(Math.round(Math.random()*254));

        if(color1 < 65 | color2 < 65 | color3 < 75){
            setColorText(0);
        }else if(color1 > 65 | color2 > 65 | color3 > 75) {
            setColorText(255);
        }
        console.log(colorText);
    }

    const getData = () => {
        const randomIndex = Math.round(Math.random()*101);
        setQuote(data.quotes[randomIndex].quote);
        setAuthor(data.quotes[randomIndex].author);
    }


    return (
        // <div className='bg' style={{background: `rgb(${0},${20},${0})`, 
        <div className='bg' style={{backgroundColor: `rgb(${color1},${color2},${color3})`,
                                    color:`rgb(${colorText},${colorText},${colorText})`} }>
            <QuotePrint quote = {quote} author = {author}/>
            <button className='btn-position btn-style' onClick={newQuote} >Cita Nueva</button>

            <div className='pos-twitter bg-tw' >
                <a  href='https://www.google.com/' target='_blank'> 
                    <img className='img-twitter' src={twitter}/> 
                    <p className='lett-tw' >Click aquí para compartir</p>
                </a>
            </div>
        </div>
    );
}

export default QuoteContainer;
