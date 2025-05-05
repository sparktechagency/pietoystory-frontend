import React from 'react'
import Banner from './Banner'
import PromisseRefer from './PromisseRefer'
import About from './About'

const Home: React.FC = () => {
    return (
        <div>
            <Banner></Banner>
            <PromisseRefer></PromisseRefer>
            <div id='about' >
                <About></About>
            </div>
        </div>
    )
}

export default Home
