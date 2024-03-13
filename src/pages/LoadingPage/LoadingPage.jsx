import React from 'react';
import "../LoadingPage/LoadingPage.css"
const LoadingPage = () => {
  return (
    <>
      <div className='body-loading'>
            <div className='container-rings'>
                <div className='ring'></div>
                <div className='ring'></div>
                <div className='ring'></div>
                <span className='loadingWord'>Loading...</span>
            </div>
      </div>
    </>
  );
}

export default LoadingPage;
