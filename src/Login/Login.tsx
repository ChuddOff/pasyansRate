import { SignedIn, SignedOut, SignInButton, UserButton, useAuth  } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom'

import './Login.scss'
import { useEffect, useRef, useState } from "react";

 
const Login: React.FC = () => {

    const { isSignedIn } = useAuth();

    useEffect(() => {
        if (isSignedIn) {
            if (localStorage.getItem('firstReg') !== 'f') {
                localStorage.setItem('firstReg', 't')
            }
            navigate('/games');
        }
    }, [isSignedIn])

    const [allready, setAllready] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate =  useNavigate();

    const refNick = useRef<HTMLInputElement>(null);
    const refPass = useRef<HTMLInputElement>(null);

    // const signin = async () => {

    //     const fet = await fetch('http://localhost:4000/api/zamer/getProfile').then(res => {
    //         setLoading(true);
    //         return res.json();
    //     }).then(res => {
    //         setLoading(false);
    //         console.log(res);
            
    //     })
        



        // localStorage.setItem('pass', `${refPass.current?.value}`)
        // localStorage.setItem('login', `${refNick.current?.value}`)

        // navigate('/games')
    // }

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
                    
                <h2>Sign In to play!</h2>

                <SignedOut>
                    <SignInButton mode="modal" forceRedirectUrl='/games'
                    fallbackRedirectUrl='/games'
                    signUpForceRedirectUrl='/games'
                    signUpFallbackRedirectUrl='/games' />
                </SignedOut>

                <h3>We maintain your privacy</h3>

                </div>
            </main>

            
        </>
        
     );
}
 
export default Login;