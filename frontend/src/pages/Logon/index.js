import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'

export default function Logon(){
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogon(event){
        event.preventDefault()

        try{
            const response = await api.post('sessions', { id })
            localStorage.setItem('ngoId', id)
            localStorage.setItem('ngoName', response.data.name)
            history.push('/profile')
        }catch(err){
            alert('Logon failed try again.')
        }
    }

    return(
        <div className='logon-container'>
            <section className='form'>
                <img src={ logoImg } alt='Be The Hero' />
                <form onSubmit={ handleLogon }>
                    <h1>Make your Logon</h1>
                    <input
                        placeholder='Your ID'
                        value={ id }
                        onChange={ event => setId(event.target.value) }
                    />
                    <button
                        className='button'
                        type='submit'
                    >
                        Enter
                    </button>
                    <Link className='back-link' to='/register'>
                        <FiLogIn size={ 16 } color='#e02041' />
                        I have no registration
                    </Link>
                </form>
            </section>
            <img src={ herosImg } alt='Heroes' />
        </div>
    )
}
