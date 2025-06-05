import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import mail_regular_icon from "../../assets/images/mail_icon.svg"
import mail_valid_icon from "../../assets/images/mail_confirmed_icon.svg"
import mail_error_icon from "../../assets/images/error_icon.svg"

import { ValidTokenType } from "./ValidTokenType";
import { sendConfirmMailToken, requestConfirmMailToken } from "../../utils/ConfirmMail/sendConfirmMail";

function ConfirmEmail(){
    const params = new URLSearchParams(useLocation().search)
    const mailToken = params.get('token')
    const navigate = useNavigate();

    const [validToken, setValidToken] = useState<ValidTokenType>(ValidTokenType.Waiting)

    useEffect(() => {
        const verifyToken = async () => {
            if (!mailToken) {
                navigate('/', { replace: true });
            }else{
                const tokenStatus = await sendMailTokenForVerification()
                setValidToken(tokenStatus)
            }
        }

        verifyToken()
    }, [mailToken]);

    const sendMailTokenForVerification = async () => {
        const result = await sendConfirmMailToken(mailToken!);
        if (result.success) {
            if(result.result == "valid") return ValidTokenType.Valid
            if(result.result == "used") return ValidTokenType.Used
            return ValidTokenType.Error
        } else {
            if(result.result == "expired") return ValidTokenType.Expired
            return ValidTokenType.Error
        }
    }

    const requestNewConfirmEmailToken = async () => {
        const result = await requestConfirmMailToken(mailToken!);
        if (result.success) {
            setValidToken(ValidTokenType.Requested)
        } else {
            setValidToken(ValidTokenType.Error)
        }
    }

    const goToHomepage = () => {
        navigate("/")
    }

    const viewIcon = () => {
        if(validToken === ValidTokenType.Valid) return mail_valid_icon
        if((validToken === ValidTokenType.Expired) || (validToken === ValidTokenType.Error)) return mail_error_icon
        return mail_regular_icon
    }

    const viewTitle = () => {
        if(validToken === ValidTokenType.Valid) return "Correo electrónico verificado"
        if(validToken === ValidTokenType.Expired) return "Enlace expirado"
        if(validToken === ValidTokenType.Used) return "Tu Correo electrónico ya se encuentra verificado"  
        if(validToken === ValidTokenType.Requested) return "Se ha pedido un nuevo enlace"
        if(validToken === ValidTokenType.Error) return "Ha ocurrido un error"
        return "Un momento..."
    }

    const viewSubitle = () => {
        if(validToken === ValidTokenType.Valid) return "¡Gracias por verificar tu correo! Ya puedes acceder a todos los servicios de UniHousing"
        if(validToken === ValidTokenType.Expired) return "Has excedido el tiempo para confirmar tu correo con este enlace y ha expirado"
        if(validToken === ValidTokenType.Used) return "Tu cuenta ya está completamente lista para usar el servicio"
        if(validToken === ValidTokenType.Requested) return "Verifica tu casilla de correos para abrir el nuevo enlace de verificación"
        if(validToken === ValidTokenType.Error) return "Intenta nuevamente o pide un nuevo enlace"
        return "Estamos verificando tu correo"
    }

    if (!mailToken) return null;
    
    return (
        <main className="w-full h-screen grid place-items-center">
            <div>
                <img
                    src={viewIcon()}
                    alt="Mail"
                    className="w-20 object-fit m-auto"
                />
                <SimpleViewTitle
                    title={viewTitle()}
                    subtitle={viewSubitle()}
                />
                {((validToken !== ValidTokenType.Waiting) && (validToken !== ValidTokenType.Requested)) && (
                    <div className="w-fit my-5 mx-auto">
                        {
                            ((validToken === ValidTokenType.Expired) || (validToken === ValidTokenType.Error))
                            ? (<PrimaryButton title="Enviar enlace nuevamente" action={requestNewConfirmEmailToken} />) 
                            : (<PrimaryButton title="Ir al Inicio" action={goToHomepage} />)
                        }
                    </div>
                )}
                    
            </div>
        </main>
    )
}

export default ConfirmEmail;