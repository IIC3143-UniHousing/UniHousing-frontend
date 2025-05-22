import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

type LoginButtonProps = {
    title: string
}

function LoginButton(props: LoginButtonProps){
    const { loginWithRedirect } = useAuth0();
    const {title} = props;

    return (
        <button
            onClick={() => loginWithRedirect}
            className="py-2 px-5 bg-teal-400 rounded-xl border border-teal-600 text-white font-bold hover:bg-teal-600 active:bg-white active:text-teal-400">
                {title}
        </button>
    )
}

export default LoginButton;