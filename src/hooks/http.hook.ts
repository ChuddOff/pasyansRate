import { useCallback, useState } from "react";

export const useHttp = () => {
    // const [proc, setProc] = useState('waiting');

    const request = useCallback(async (url: string, method: string = 'GET', body: any = null, headers: any = {'Content-Type': 'application/json'}) => {
        const urlDomen = process.env.BACKURL || "https://heroes-back.vercel.app"
        // const urlDomen = "http://localhost:4000"
        // setProc('loading');
        try {
            const response = await fetch(urlDomen+url, {method, body, headers}); 

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
 
            const data = await response.json();
            return data;
        } catch(e) {
            console.log(e);
            // setProc('error');
            throw e;
        }
    }, []);

    return {request}
}