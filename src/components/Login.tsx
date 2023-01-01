import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import LoginService from '../service/loginService'
import { userLoggedIn } from '../features/loginSlice'
import YupPassword from 'yup-password'
import styles from './Login.module.css'
import { Container, Row, Col } from 'react-bootstrap'
YupPassword(Yup)

export function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: '' })

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email(),
    password: Yup.string()
      .required()
      .password()
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

    dispatch({ type: userLoggedIn.type, payload: status })
  }

  return (
    <Container className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col >
            <input
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
          <Col className={styles.column}>
            {errors.email && <span role="alert">{errors.email.message as string}</span>}
          </Col>
          <Col >
            <input
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
            <button type="submit">Login</button>
          </Col>
        </Row>
      </form>
    </Container>
  )
}
