import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.scss";

const Authentication = () => {
    return (
        <div className="authorization-container">
            <h1>Authorization</h1>
            <div className="forms-container">
                <SignUpForm />
                <SignInForm />
            </div>
        </div>
    );
};

export default Authentication;
