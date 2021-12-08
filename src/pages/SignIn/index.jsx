import {
    StyledLoginPage,
    StyledLoginTitle,
    StyledForm,
    StyledField,
    StyledFieldInput,
    StyledFieldLabel,
    StyledLoginWrapper,
    StyledSubmit,
    StyledHeaderTitle,
    StyleLink,
} from '../../utils/style/LoginSignStyle'

function SignIn() {
    return (
        <StyledLoginPage>
            <StyledHeaderTitle>Pando</StyledHeaderTitle>
            <StyledLoginWrapper>
                <StyledLoginTitle>Inscription</StyledLoginTitle>
                <StyledForm action="#">
                    <StyledField>
                        <StyledFieldInput
                            type="text"
                            name="username"
                            required
                        />
                        <StyledFieldLabel htmlFor="username">
                            pseudo
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput type="email" name="email" required />
                        <StyledFieldLabel htmlFor="email">
                            e-mail
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput
                            type="password"
                            name="password"
                            required
                        />
                        <StyledFieldLabel htmlFor="password">
                            mot de passe
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput
                            type="password"
                            name="verif_password"
                            required
                        />
                        <StyledFieldLabel htmlFor="verif_password">
                            confirmer le mot de passe
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <input type="checkbox" name="remember-me" required />
                        <label htmlFor="accept-rules">
                            J'accepte les conditions d'utilisations
                        </label>
                    </StyledField>
                    <StyledField>
                        <StyledSubmit />
                    </StyledField>
                    <StyledField>
                        Déjà inscrit ?
                        <StyleLink to="/login"> Se connecter</StyleLink>
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
        </StyledLoginPage>
    )
}

export default SignIn
