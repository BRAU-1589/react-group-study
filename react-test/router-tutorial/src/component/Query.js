import React from 'react';
import { useSearchParams } from 'react-router-dom';

function QueryComponent() {
    let [searchParams, setSearchParams] = useSearchParams();

    // 쿼리 스트링에서 'name' 파라미터 읽기
    let name = searchParams.get('name');

    return (
        <div>
            <h1>Hello, {name ? name : 'Guest'}!</h1>
            {/* 쿼리 스트링 변경 */}
            <button onClick={() => setSearchParams({ name: '인영' })}>
                eyeg가 누구야?
            </button>
        </div>
    );
}

export default QueryComponent;

