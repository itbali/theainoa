import { useState } from "react";
import {} from "../../utils/firebase/firebase.util";
import FormInput from "./../form-input/form-input.component";
import "./sign-in-form.scss";
import Button from "../../components/button/button.component";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInWithGithubPopup,
    signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("signIN");
        try {
            const { user } = await signInUserWithEmailAndPassword(
                email,
                password
            );
            resetFormFields();
        } catch (e) {
            if (e.message) {
                alert(e.message);
            } else {
                alert("some error has aquired");
            }
        }
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const logWithService = (service) => async () => {
        const { user } = await service();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <Button
                onClick={logWithService(signInWithGooglePopup)}
                buttonType={"google"}
                type="button"
            >
                sign in with google
            </Button>
            <Button
                onClick={logWithService(signInWithGithubPopup)}
                buttonType={"inverted"}
                type="button"
            >
                sign in with Git
            </Button>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Email"}
                    required
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label={"Password"}
                    required
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <Button type="submit">Sign In</Button>
            </form>
        </div>
    );
};

export default SignInForm;
