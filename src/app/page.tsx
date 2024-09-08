import Link from "next/link";
import './styles/app.css';

export default function Home() {
  return (
      <div>
         <ul>
             <Link href={"/facebook"}>Facebook</Link>
           <li className='red'> <a href="/youtube">Youtube</a> </li>
           <li className='green' style={{margin: '20px 0', background: 'red'}}> <a href="/tiktok">Tiktok</a> </li>
         </ul>
      </div>
  )
}
