import React from 'react';
import Menu from './Navbar'
import homeImage from './home.png';


export default function Home() {

    const userId = localStorage.getItem('userId');

    return (
        <>
            <Menu />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img
                    src={homeImage}
                    alt="capa"
                    style={{ maxWidth: '60%', maxHeight: '60%' }}
                />
            </div>
            
        </>
    );
}

/*
return (
    <div>
      {userId !== null ? (
        <div>
          <Menu />
          <Trips />
        </div>
      ) : (
        <p>Nenhum usuário autenticado</p>
      )}
    </div>
  ); */
