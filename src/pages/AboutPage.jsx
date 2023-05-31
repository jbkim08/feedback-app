import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage(props) {
  return (
    <div className='card'>
      <div className='about'>
        <h1>About 페이지</h1>
        <p>제품또는 서비스에 피드백을 제공하는 리엑트 앱입니다.</p>
        <p>버전 : 1.0.0</p>

        <p>
          <Link to='/'>홈으로 돌아가기</Link>
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
