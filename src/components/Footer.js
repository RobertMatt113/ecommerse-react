import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <p>© Roberto Mattus 2022</p>
            <div className="footer-main">
                <div className="icon">
                    <svg height={80} width={80}>
                        <circle cx={40} cy={40} r={35} stroke={"white"} strokeWidth={4} fill={"none"}></circle>
                    </svg>
                    <a href="https://www.instagram.com/roberto__mattus/"><i className='bx bxl-instagram bx-tada' ></i></a>
                </div>

                <div className="icon">
                    <svg height={80} width={80}>
                        <circle cx={40} cy={40} r={35} stroke={"white"} strokeWidth={4} fill={"none"}></circle>
                    </svg>
                    <a href="https://www.linkedin.com/in/roberto-mattus-b7b615231/"><i className='bx bxl-linkedin bx-tada' ></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;