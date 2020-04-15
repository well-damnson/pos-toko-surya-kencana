import React, { useEffect } from 'react';

let styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#DCDCDC',
    width: '18vw',
    height: 'auto',
    justifyContent: 'center',
    alignItem: 'center',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  block: {
    display: 'block',
  },
  none: {
    display: 'none',
  },
};

let FailedLoginModal = ({ handleClose, show }) => {
  useEffect(
    () => {
      let timer1 = setTimeout(() => handleClose(), 3000);

      // this will clear Timeout when component unmont like in willComponentUnmount
      return () => {
        clearTimeout(timer1);
      };
    },
    [show], //useEffect will run only when show change
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  );
  return (
    <div style={show ? styles.block : styles.none}>
      <div style={styles.modal} onClick={handleClose} />
      <div style={styles.content}>
        <p style={{ alignSelf: 'center', marginVertical: '10' }}>Login Gagal</p>
        <button onClick={handleClose}>tutup</button>
      </div>
    </div>
  );
};

export default FailedLoginModal;
