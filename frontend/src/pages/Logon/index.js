import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon(){

    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

    try{
        const response = await api.post('sessions', { id });
        
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);
    
        history.push('/profile');
    
    } catch (err){
            alert('Erro al Entrar, intente otra vez');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />

            <form onSubmit={handleLogin}>
                <h1>Acceder aquí</h1>

                <input placehorlder="Su ID" 
                value={id}
                onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={12} color="green"/>
                    No tengo cuenta.
                </Link>
            </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}