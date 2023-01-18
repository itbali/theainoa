import { useState } from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import FormInput from "./../form-input/form-input.component";
import "./sign-up-form.scss";
import Button from "../button/button.component";

const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, name, password, passwordConfirm } = formFields;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== passwordConfirm) {
            return alert("Passwords do not match");
        }
        try {
            const response = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(response.user, {
                displayName: name,
            });
            resetFormFields();
        } catch (e) {
            if (e.message) {
                console.log({ e });
                alert(e.message);
                return;
            }
            console.error(e);
        }
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Display Name"}
                    required
                    onChange={handleChange}
                    name="name"
                    value={name}
                />
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
                <FormInput
                    label={"Confirm Password"}
                    required
                    type="password"
                    onChange={handleChange}
                    name="passwordConfirm"
                    value={passwordConfirm}
                />
                <Button type="submit">SignUp</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
