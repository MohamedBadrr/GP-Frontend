import React from 'react';
import "../LoadingPage/LoadingPage.css"
const LoadingPage = () => {
  return (
    <>
      <div className='body-loading-page'>
            <div className='container-rings-lodaing-page'>
                <div className='ring-loading-page'></div>
                <div className='ring-loading-page'></div>
                <div className='ring-loading-page'></div>
                <span className='loadingWord'>Loading...</span>
            </div>
      </div>
    </>
  );
}

export default LoadingPage;
