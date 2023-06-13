import { useCookies } from 'react-cookie'

const SignInComponent = () => {


    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

    async function onSubmit(values) {
        const response = await getOauthResponse(values);

        let expires = new Date()
        expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
        setCookie('access_token', response.data.access_token, { path: '/', expires })
        setCookie('refresh_token', response.data.refresh_token, { path: '/', expires })


    }

}