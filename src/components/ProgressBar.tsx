import React, { useState, useLayoutEffect } from 'react';

const ProgressBar: React.SFC = () => {
  const [used, setUsed] = useState(0);

  useLayoutEffect(() => {
    function onScroll() {
      const html = document.documentElement;
      const scrollHeight = html.scrollHeight;
      const scrollTop = html.scrollTop;
      setUsed(scrollTop / (scrollHeight - window.innerHeight));
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="progress-container" style={{
      position: 'fixed',
      top: 0,
      left: '-2px',
      width: '100%',
    }}>
      <span className="used" style={{
        width: `${used * 100}%`,
        backgroundColor: '#ccc',
        display: 'block',
        border: '1px solid #ff816f',
      }}></span>
    </div>
  );
};

export default ProgressBar;
