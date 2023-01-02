import { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import LoginService from '../service/loginService'
import styles from './Login.module.css'
import Alert from '@mui/material/Alert'
import { Container, Row, Col } from 'react-bootstrap'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: '' })

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email(),
    password: Yup.string()
      .required()
  })

  const validationOpt = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, formState } = useForm(validationOpt)

  const { errors } = formState

  function onSubmit() {
    let userInfo = { email, password }

    LoginService.login(userInfo)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        setStatus({ type: "success" })
      })
      .catch(() => {
        setStatus({ type: "error" })
      })

  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          {status.type === 'success' && <Alert data-test-id='success' severity='success'>You logged in successfully!</Alert>}
          {status.type === 'loggedOut' && <Alert data-test-id="loggedOut" severity='success'>You logged out seccessfully! </Alert>}
          {status.type === 'error' && <Alert data-test-id="error" severity='error'>Something went wrong. <br />
            Make sure you put correct email and password</Alert>}
          {status.type === 'logout' && <Alert data-test-id="warning" severity='warning'>You are not logged in</Alert>}
        </Col>
        {errors.email && <Col className={styles.column}>
          <Alert data-test-id="email-message" severity='error'>{errors.email.message as string}</Alert>
        </Col>}
        {errors.password?.message?.toString().includes('required') && <Col>
          <Alert data-test-id="password-message" severity='error'>{errors.password.message as string}</Alert>
        </Col>}
        <Col>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className={styles.column}>
                <input
                  data-test-id='email'
                  type="email"
                  placeholder="Please enter your email"
                  value={email}
                  {...register("email", {
                    required: "required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address"
                    }
                  })}
                  className={`${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col >
                <input
                  data-test-id="password"
                  type="password"
                  value={password}
                  placeholder="Please enter your password"
                  {...register("password", {
                    required: "required"
                  })}
                  className={`${errors.password ? "is-invalid" : ""}`}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col className={styles.loginButton}>
                <button data-test-id='login' type="submit">ُSubmit</button>
              </Col>
            </Row>
          </form>
        </Col>
        <Col>
          <button data-test-id="logout" type="button" onClick={() => {
            if (!localStorage.getItem('accessToken')) {
              setStatus({ type: 'logout' })
            } else {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
              setStatus({ type: 'loggedOut' })
            }

          }}>Logout</button>
        </Col>
      </Row>
    </Container>
  )
}
