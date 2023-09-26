import React, { useState, useEffect } from 'react';

const DotsAnimation = () => {
  const [dots, setDots] = useState('ローディング');
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (dots === 'ローディング') {
        setDots('ローディング .');
      } else if (dots === 'ローディング .') {
        setDots('ローディング . .');
      } else if (dots === 'ローディング . .') { // Corrected this line
        setDots('ローディング . . .'); 
      } else (setDots('ローディング'))
    }, 300);
    
    return () => clearInterval(interval);
  }, [dots]);
  
  return (
    <div className='dots-animation'>
      {dots}
    </div>
  );
};

export default DotsAnimation;


// |/-|