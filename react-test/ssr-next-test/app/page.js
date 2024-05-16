import React from 'react';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div style={{textAlign: 'center',fontSize:'50px', width:'100%'}}>
            <h1 style={{position:'absolute', left:'50%', transform:'translate(-50%)', }}>NEXT.JS 서버 사이드 렌더링 테스트</h1>
            <div style={{height: '100vh', fontSize:'50px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <p>
                    <Link href="/blue" style={{margin: '10px', display: 'inline-block', color: '#4a62ff',}}>
                        GO TO BLUE
                    </Link>
                </p>
                <p>
                    <Link href="/red" style={{margin: '10px', display: 'inline-block', color: '#8a0707',}}>
                        GO TO RED
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default HomePage;