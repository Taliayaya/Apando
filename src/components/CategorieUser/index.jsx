import { StyleCategorie, StyleUser } from './CategorieUserStyle'

function CategorieUser() {
    return (
        <div>
            <StyleCategorie>En ligne</StyleCategorie>
            <StyleUser online>Ilan</StyleUser>
            <StyleCategorie>Hors-Ligne</StyleCategorie>
            <StyleUser>François</StyleUser>
        </div>
    )
}
export default CategorieUser
