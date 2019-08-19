import React, { useState, useEffect } from 'react';

const ProgressBar: React.SFC = () => {
  const html = document.documentElement;
  const [used, setUsed] = useState(0);

  // function onScroll() {
  //   const scrollHeight = html.scrollHeight;
  //   const scrollTop = html.scrollTop;
  //   setUsed(scrollTop / (scrollHeight - window.innerHeight));
  // }

  useEffect(() => {
    function onScroll() {
      const scrollHeight = html.scrollHeight;
      const scrollTop = html.scrollTop;
      setUsed(scrollTop / (scrollHeight - window.innerHeight));
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
    // React Hook useEffect has missing dependencies: 'html.scrollHeight' and 'html.scrollTop'.
    // Either include them or remove the dependency array react-hooks/exhaustive-deps.
    // TODO: How can I achieve only call `useEffect` in the init state and avioding the above warning in the same time?
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
  )
};

export default ProgressBar;
