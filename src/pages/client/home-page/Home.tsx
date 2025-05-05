import React from 'react'
import Banner from './Banner'
import PromisseRefer from './PromisseRefer'
import About from './About'
import Location from './Location'

const Home: React.FC = () => {
    return (
        <div>
            <Banner></Banner>
            <PromisseRefer></PromisseRefer>
            <div id='about' >
                <About></About>
                <Location></Location>
            </div>
        </div>
    )
}

export default Home
