import React, { useState, useEffect } from 'react';
import QuotePrint from './QuotePrint';
import twitter from '.././media/twitter.png';


const QuoteContainer = () => {

    //useEffect para datos del JSON
    const [data, setData] = useState(null);
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');


    //hooks para el fondo random con rgb
    const [color1, setColor1] = useState(255);
    const [color2, setColor2] = useState(255);
    const [color3, setColor3] = useState(255);

    //texto contrasta al fondo
    const [colorText, setColorText] = useState(0);

    //Limite del tamaño de la cadena de texto, para que se pueda publicar el tweet
    const limit = 182;

    //La cita y el autor estarán cambiando y al final se actualizará con el hook tweet2
    //el tweet1, tweet3, enter y espacio son las cadenas predifinidas que no van a cambiar y se concadenarán con el hook
    //una vez modificada la cita y el autor del JSON
    const tweet1 = 'https://twitter.com/intent/tweet?text=%E2%80%9C';
    const tweet3 = '%0AEsta%20cita%20me%20encant%C3%B3,%20descubre%20tu%20cita%20ideal!%0AVisita%3A%20https%3A//quotes-by-moises.netlify.app/';
    const enter = '%0A';
    const spaceTwwt = '%20';

    const [tweet2, setTweet2] = useState('');

    //URL del fetch
    const url = 'https://gist.githubusercontent.com/carmandomx/3d7ac5f15af87a587e1d25f5ba96de61/raw/e2d848b87c730a580077de221666343c15b1a243/gistfile1.txt';



    //Logica que llevará a cabo el cambio de cita y autor
    useEffect(() => {
        if (quote && author) {

            //String a Array
            let quoteArr = quote.split('');
            let authorArr = author.split('');
            let textFinal = '';

            //Si la cadena de texto de la cita excede el limite definido, se cortará la cita y se añadirá al final
            //puntos suspensivos
            if (quoteArr.length >= limit) {
                for (let i = 0; i <= limit; i++) {
                    if (quoteArr[i] == ' ') {
                        quoteArr.splice(i, 1, spaceTwwt);
                    }
                    if (i == limit) {
                        quoteArr.splice(i,quoteArr.length);
                        quoteArr.push(spaceTwwt);
                        quoteArr.push('...');
                        quoteArr.push(enter);
                    }
                }
                //El tamaño de la cita no excede y no habrá problema alguno para su publicación
            } else {
                for (let i = 0; i < quoteArr.length; i++) {
                    if (quoteArr[i] == ' ') {
                        quoteArr.splice(i, 1, spaceTwwt);
                    }
                    if (i == quoteArr.lastIndexOf('.')) {
                        quoteArr.push(enter);
                    }
                }
            }

            //Misma logica de la cita, pero para el autor
            for (let i = 0; i < author.length; i++) {
                if (author[i] == ' ') {
                    authorArr.splice(i, 1, spaceTwwt);
                }
            }

            //Array a String
            quoteArr = quoteArr.join('');
            authorArr = authorArr.join('');
            textFinal = quoteArr + authorArr;

            //Hook
            setTweet2(textFinal);
        }

    }, [quote, author])

    //Se ejecutará 1 vez y será el inicio
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(datos => setData(datos))
        setColor1(Math.round(Math.random() * 254));
        setColor2(Math.round(Math.random() * 254));
        setColor3(Math.round(Math.random() * 254));
    }, []);

    useEffect(() => {
        if (data) {
            getData();

        }
    }, [data]);

    const newQuote = () => {
        getData();
        newBg();

    }

    const newBg = () => {
        setColor1(Math.round(Math.random() * 254));
        setColor2(Math.round(Math.random() * 254));
        setColor3(Math.round(Math.random() * 254));

        if (color1 < 65 | color2 < 65 | color3 < 75) {
            setColorText(0);
        } else if (color1 > 65 | color2 > 65 | color3 > 75) {
            setColorText(255);
        }
    }

    const getData = () => {
        const randomIndex = Math.round(Math.random() * 101);
        setQuote(data.quotes[randomIndex].quote);
        setAuthor(data.quotes[randomIndex].author);
    }



    return (
        // <div className='bg' style={{background: `rgb(${0},${20},${0})`, 
        <div className='bg' style={{
            backgroundColor: `rgb(${color1},${color2},${color3})`,
            color: `rgb(${colorText},${colorText},${colorText})`
        }}>
            <QuotePrint quote={quote} author={author} />
            <button className='btn-position btn-style' onClick={newQuote} >Cita Nueva</button>

            <div className='pos-twitter bg-tw' >

                {/*Aqui se hará el cambio*/}
                {/*Twitt menor a 279 caracteres*/}
                <a href={tweet1 + tweet2 + tweet3} target='_blank'>
                    <img className='img-twitter' src={twitter} />
                    <p className='lett-tw' >Click aquí para compartir</p>
                </a>
            </div>
        </div>
    );
}

export default QuoteContainer;
