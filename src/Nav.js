import React, {useEffect, useState} from 'react';
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >100 ) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && "nav-black"}`}>
            <img 
            className="nav-logo"
            src="http://pngimg.com/uploads/netflix/small/netflix_PNG31.png"
            alt="Netflix Logo" />

<button className="nav-button">
                        Sign In
                    </button>

            {/*<img 
            className="nav-avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToEzEh7mACye7XECRLO2EGNGyp3EOBlstBsg&usqp=CAU"
            alt="Netflix logo" />*/}

        </div>
    );
}

export default Nav;
