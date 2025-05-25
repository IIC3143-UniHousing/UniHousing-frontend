import { useEffect} from 'react';



const Login = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.auth0.com/js/lock/11.35/lock.min.js';
        script.onload = () => {
            const lock = new window.Auth0Lock(
                '0l0W8WV60zL8JtjUYBXnXT2vu8Ws7DOp',
                'dev-h02ga8ibabubhgaj.us.auth0.com',
                {
                language: 'es',
                initialScreen: 'login',
                allowedConnections: ['Username-Password-Authentication'],
                additionalSignUpFields: [
                    {
                        name: 'full_name',
                        placeholder: 'Nombre completo',

                    },
                    {
                        name: 'account_type',
                        placeholder: 'Tipo de Cuenta'
                    },],
                auth: {
                    redirectUrl: 'http://localhost:5173',
                    responseType: 'token id_token',
                    params: {
                        scope: 'openid profile email'
                    },
                },
            });

            lock.show();

            lock.on('authenticated',  (authResult) => {
                lock.getUserInfo(authResult.accessToken, (error, profileResult) => {
                    if (error) {
                        console.error('Error al obtener el perfil:', error);
                        return;
                    }
                    localStorage.setItem('access_token', authResult.accessToken);
                    localStorage.setItem('id_token', authResult.idToken);
                    localStorage.setItem('user_profile', JSON.stringify(profileResult));
                    window.location.href ='/';
                });
            });
        };

        document.body.appendChild(script);
    }, []);

    return null;
};

export default Login;