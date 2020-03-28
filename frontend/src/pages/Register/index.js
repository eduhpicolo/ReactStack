import React, { useState } from 'react';
import { Link , useHistory  } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Register(){
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

    try{
        const response = await api.post('ongs', data);
        
        alert(`Su ID para acceder: ${response.data.id}`);
    
        history.push('/');
    
    } catch (err){
            alert('Erro al registrar, intente otra vez');
        }
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Coronavirus" />
                
                    <h1>Registra</h1>
                    <p>Complete los campos para registrar los caso de Coronavirus de su region.</p>
                
                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="green"/>
                    Volver
                    </Link>
                
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nombre" 
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="Email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp" 
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                    <input placeholder="Ciudad" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                    />
                    <input placeholder="País" style={{ width: 100}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                    />
                    </div>

                    <button className="button" type="submit">Cadastar</button>        
                </form>

            </div>
        </div>
    );
}