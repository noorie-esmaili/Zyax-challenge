import { SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import LoginService from '../service/loginService'
import { addParcels } from '../features/loginSlice'
import Alert from "@mui/material/Alert"
import styles from './Login.module.scss'

export function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: '' })

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(3, "Name length should be at least 3 characters"),
    weight: Yup.number()
      .typeError("Weight must be an integer")
      .required()
      .positive()
      .integer(),
  })

  const validationOpt = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, formState } = useForm(validationOpt)

  const { errors } = formState

  function onSubmit() {
    let parcel = { email, password }

    LoginService.login(parcel)
      .then((response) => {
        dispatch({ type: addParcels.type, payload: response.data })
        setStatus({ type: "success" })
      })
      .catch(() => {
        setStatus({ type: "error" })
      })
  }

  return (
    <div className={styles.container}>
      <div>
        {status?.type === "success" && (
          <Alert style={{ fontSize: "1em" }} severity="success">
            The parcel was added successfully
          </Alert>
        )}
        {status?.type === "error" && (
          <Alert style={{ fontSize: "1em" }} severity="error">
            *Please select a color or country <br />
            *color cannot be in blue shades
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
        <br />
        <div className="invalid-feedback">{errors.email?.message}</div>
        <br />
        <input
          type="password"
          value={[password]}
          {...register("password", { required: true })}
          className={`${errors.password ? "is-invalid" : ""}`}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="invalid-feedback">{errors.password?.message}</div>
        <input type="submit" />
      </form>
    </div>
  )
}
