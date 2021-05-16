import React, {Fragment} from 'react';

const QuotePrint = ({quote, author}) => {

    return (
        <Fragment>
            <div> 
                <h1 className='box-h1'> <span className='size-mark'>“</span>{quote}</h1>
                <h3 className='box-h3'>- {author}</h3>  

            </div>       
        </Fragment>
    )
}

export default QuotePrint
