import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import SimpleContainer from "../../components/SimpleContainer/SimpleContainer";
import SimpleContainerSeparator from "../../components/SimpleContainer/SimpleContainerSeparator";
import TextInput from "../../components/TextInput/TextInput";
import TextArea from "../../components/TextArea/TextArea";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

function CreateHousing(){
    const submitPreventDefault = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }

    const submitForm = () => {
        //TODO: Formar JSON y enviar a endpoint
        alert("Enviando form...")
    }

    return (
        <div>
            <SimpleViewTitle
                title={"Agrega una nueva propiedad"} 
                subtitle={"Rellena los siguientes datos para agregar una propiedad"}
            />
            <SimpleContainer>
                <form action="#" onSubmit={submitPreventDefault}>
                    <SimpleContainerSeparator title="Información básica">
                        <TextInput name="title" title="Nombre de la propiedad" />
                        <TextInput name="price" title="Precio de alojamiento" />
                        <TextInput name="address" title="Dirección" />
                        <TextArea name="description" title="Descripción"/>
                    </SimpleContainerSeparator>
                    <SimpleContainerSeparator title="Información de la propiedad">
                        <TextInput name="size" title="Tamaño" />
                        <TextInput name="rooms" title="Número de Piezas" />
                        <TextInput name="bathrooms" title="Número de Baños" />
                    </SimpleContainerSeparator>
                    <SimpleContainerSeparator title="Imágenes de la propiedad">
                        <ImageUpload />
                    </SimpleContainerSeparator>
                    <div className="flex align-center justify-center">
                        <PrimaryButton action={submitForm} title="Agregar propiedad"/>
                    </div>
                </form>
            </SimpleContainer>
        </div>
    )
}

export default CreateHousing;