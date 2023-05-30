// Libraries
import React from 'react'
// Components 
import Header from './main/Header'
import Body from './main/Body';
import Footer from './main/Footer' 
// Styles
import '../assets/style.css'
import '../assets/responsive.css'

export default function Home() { 
    return (
        <div className="mainContainer">
            <Header />
            <Body />
            <Footer className="footer" />
        </div>
    );
}
