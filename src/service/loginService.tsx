import axios from "axios"

const PARCEL_BASE_REST_API_URL = "https://test.zyax.se/access"

class LoginService {
	login = async (userInfo: object) => {
		return await axios.post(PARCEL_BASE_REST_API_URL, userInfo)
	}
}

export default new LoginService()
