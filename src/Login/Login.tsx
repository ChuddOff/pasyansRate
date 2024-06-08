import { useNavigate } from "react-router-dom";

import './Login.scss'
 
const Login: React.FC = () => {

    const navigate =  useNavigate();

    const signin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pass = Math.round(Math.random() * 10000000)
        localStorage.setItem('pass', `${pass}`)

        navigate('/games')
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
                        <form 
                        className="regForm" 
                        onSubmit={signin}>
                            <h1>Are you a newbie?</h1>
                            <input placeholder="Enter your nickname" type="text" />
                            <button type="submit">Sign up</button>
                        </form>
                        
                    </div>
                    <div className="login">
                    <form className="regForm">
                            <h1>You want to log in?</h1>
                            <input placeholder="Enter your pass" type="text" />
                            <button type="submit">Log in</button>
                        </form>
                        
                    </div>
                </div>
            </main>
        </>
        
     );
}
 
export default Login;