import { useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import styles from './Login.module.css'

export function Login() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className="form-group">
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail" onChange={(event) => { setEmail(event.target.value) }} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
        </div>
        <button type="button" className="btn btn-primary" onClick={() => {

        }}>Login</button>
      </form>
    </div>
  )
}
