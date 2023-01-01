import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import LoginService from '../service/loginService'
import { addParcels } from '../features/loginSlice'
import Alert from "@mui/material/Alert"
import YupPassword from 'yup-password'
import styles from './Login.module.css'
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
    console.log('clicked')

    let userInfo = { email, password }

    LoginService.login(userInfo)
      .then((response) => {
        console.log(response)

        dispatch({ type: addParcels.type, payload: response.data })
        setStatus({ type: "success" })
      })
      .catch((error) => {
        console.log(error)
        setStatus({ type: "error" })
      })
  }

  return (
    <div className={styles.container}>
      <div>
        {status?.type === "success" && (
          <Alert style={{ fontSize: "1em" }} severity="success">
            You are logged in
          </Alert>
        )}
        {status?.type === "error" && (
          <Alert style={{ fontSize: "1em" }} severity="error">
            Email or password is wrong
          </Alert>
        )}
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Please enter your email"
          value={email}
          {...register("email", { required: true })}
          className={`${errors.email ? "is-invalid" : ""}`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="invalid-feedback">{errors.email?.message as string}</div>
        <input
          type="password"
          value={[password]}
          placeholder="Please enter your password"
          {...register("password", { required: true })}
          className={`${errors.password ? "is-invalid" : ""}`}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="invalid-feedback">{errors.password?.message as string}</div>
        <button type="button" onClick={onSubmit} >Login</button>
      </form>
    </div>
  )
}
