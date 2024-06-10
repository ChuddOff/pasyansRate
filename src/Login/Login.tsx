import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link, Outlet, useNavigate } from 'react-router-dom'

import './Login.scss'
import { useRef, useState } from "react";

 
const Login: React.FC = () => {

    const [allready, setAllready] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate =  useNavigate();

    const refNick = useRef<HTMLInputElement>(null);
    const refPass = useRef<HTMLInputElement>(null);

    const signin = async () => {

        const fet = await fetch('http://localhost:4000/api/zamer/getProfile').then(res => {
            setLoading(true);
            return res.json();
        }).then(res => {
            setLoading(false);
            console.log(res);
            
        })
        


        // localStorage.setItem('pass', `${refPass.current?.value}`)
        // localStorage.setItem('login', `${refNick.current?.value}`)

        // navigate('/games')
    }

    return ( 
        <>
            <header className="about">
                    <h2>Chudd Off</h2>
                    <div className="social">
                        <a href="https://t.me/chudd_off"><img src="/tg.png" alt="tg" /></a>
                        <a href="https://www.youtube.com/@chudd_off"><img src="/yt.png" alt="youtube" /></a>
                    </div>
                    <button 
                    style={{ backgroundColor: '#34a249' }}
                    onClick={() => {navigate('/games')}}>Start</button>

            </header>

            <main className="loginmenu">
                <div className="loginmenu_modal">
                    <div className="register">
                        {/* <form 
                        className="regForm" 
                        onSubmit={signin}>
                            <h1>Are you a newbie?</h1>
                            <input ref={refNick} placeholder="Enter your nickname" type="text" minLength={3} required />
                            <input ref={refPass} placeholder="Enter your pass" type="password" minLength={8} required />
                            <button type="submit">Sign up</button>

                        </form>
                        {allready && (<h3>Nickname allready exist...</h3>)} */}

                        <SignedIn>
                            <UserButton afterSignOutUrl="/signin"/>
                        </SignedIn>
                        <SignedOut>
                        <Link to="/signin">Sign In</Link>
                        </SignedOut>
                        
                    </div>
                    <div className="login">
                    <form className="regForm">
                            <h1>You want to log in?</h1>
                            <input placeholder="Enter your nickname" type="text" minLength={3} required />
                            <input  placeholder="Enter your pass" type="password" minLength={8} required />
                            <button type="submit">Log in</button>
                        </form>
                        
                    </div>
                </div>
            </main>

            
        </>
        
     );
}
 
export default Login;