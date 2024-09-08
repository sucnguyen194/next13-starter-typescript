'use client'

import {useRouter} from "next/navigation";
import { Button } from 'react-bootstrap';

const Facebook = () => {
    const router = useRouter() ;

    const handleBtn = (route) => {
       router.push(route);
    }

    return (
        <div>
            Facebook
            <div>
                <Button variant='primary'>Hoi dan IT</Button>
            </div>
            <div>
                <button onClick={() => handleBtn('/')}>Back home</button>
            </div>
            <div>
                <button onClick={() => handleBtn('/tiktok')}>Back tiktok</button>
            </div>
        </div>
    )
}

export default Facebook;
