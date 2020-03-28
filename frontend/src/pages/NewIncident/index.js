import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api'

export default function NewIncident() {
    
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');
    
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Algo paso, intente novamente');
        }
    }

    return (

        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Coronavirus" />
            
                <h1>Registrar nuevo caso</h1>
                <p>Describir con detalles el caso de su region.</p>
            
                <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="green"/>
                Volver
                </Link>
            
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Titulo del caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                <textarea 
                    placeholder="Descripcion"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                <input 
                    placeholder="Nivel de urgencia"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                
                <button className="button" type="submit">Cadastar</button>        
            </form>

        </div>
    </div>

    );
}