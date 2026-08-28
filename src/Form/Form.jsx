import {useState, useEffect} from "react";

function Form() {

    const [currentPhone, setCurrentPhone] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [currentPass, setCurrentPass] = useState("");

    const [error, setError] = useState({
        phone: "",
        email: ""
    });

    const [showPass, setShowPass] = useState(false);
    const [collapseRules, setCollapseRules] = useState(false);
    const [disableButt, setDisableButt] = useState(true);
    const [toasts, setToasts] = useState([]);

    const [passValid, setPassValid] = useState({
        length: false,
        upper: false,
        number: false,
        symbol: false
    });

    const passwordRules = [
        {key: "length", label: "At least 8 characters", test: value => value.length >= 8 },
        {key: "upper", label: "One uppercase letter", test: value => /[A-Z]/.test(value) },
        {key: "number", label: "One number", test: value => /[0-9]/.test(value) },
        {key: "symbol", label: "One special character", test: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) }
    ];

    const isPhoneValid = currentPhone.length > 0;
    const isEmailValid = emailPattern.test(currentEmail);
    const isPassValid = passwordRules.every(rule => rule.test(currentPass));

    useEffect(() => {

        setDisableButt(!(isPhoneValid && isEmailValid && isPassValid));
    }, [currentPhone, currentEmail, currentPass]);

    useEffect(() => {
        if(isPassValid) {
            const timer = setTimeout(() => {
                setCollapseRules(true);
            }, 1000);

            return () => clearTimeout(timer);
        }

        setCollapseRules(false);
    }, [isPassValid]);

    function handlePhoneChange(event) {

        const newPhone = event.target.value.replace(/\D/g, "");
        setCurrentPhone(newPhone);
    }

    function handleEmailChange(event) {

        const newEmail = event.target.value;
        setCurrentEmail(newEmail);

        if(newEmail === "") {
            setError(e => ({...e, email: ""}));
        }else if(!emailPattern.test(newEmail)) {
            setError(e => ({...e, email: "Email is Invalid"}));
        }else {
            setError(e => ({...e, email: ""}));
        };
    }

    function handlePassChange(event) {

        const newPass = event.target.value;
        setCurrentPass(newPass);

        const newPassValid = {};

        passwordRules.forEach(rule => {
            const isValid = rule.test(newPass);
            newPassValid[rule.key] = isValid;
        })

        setPassValid(newPassValid);
    }

    function showToast(message) {
        const id = Date.now();
        setToasts(t => [...t, {id, message}]);

        setTimeout(() => {
            setToasts(t => t.filter(toast => toast.id !== id));
        }, 4000);
    }

    return (
        <div className="card">
            <form method="POST" className="card-body" noValidate onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Registration was successful✓ 🎉")}}>
                    
                <h1 className="card-header">Sign up</h1>

                <label htmlFor="phone">PhoneNumber <span className="required">*</span></label>
                <div className="input-wrapper">
                    <i className="fa-solid fa-phone icon-input"></i>
                    <input type="tel" value={currentPhone} className="placeholderMrg notranslate" inputMode="numeric" pattern="[0-9]*" placeholder="***********" required id="phone"
                           onChange={handlePhoneChange} />
                </div>
                <small className="error-msg" aria-live="polite">{error.phone}</small>

                <label htmlFor="email">Email <span className="required">*</span></label>
                <div className="input-wrapper">
                    <i className="fa-solid fa-envelope icon-input"></i>
                    <input type="email" value={currentEmail} className="placeholderMrg notranslate" placeholder="name@example.com" required id="email"
                           onChange={handleEmailChange}/>
                </div>
                <small className="error-msg" aria-live="polite">{error.email}</small>

                <label htmlFor="pass">Password <span className="required">*</span></label>
                <div className="password-wrapper">
                    <i className="fa-solid fa-lock icon-input"></i>
                    <input type={showPass ? "text" : "password"} value={currentPass} placeholder="••••••••••" required id="pass"
                           onChange={handlePassChange} />
                    
                    <button type="button" className="toggle-password" aria-label="Show password"
                            onClick={() => setShowPass(s => !s)}>
                        <i className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                </div>
                <div className={`rules-wrapper ${collapseRules ? "collapsed" : ""}`}>
                    <ul className="password-rules">
                        {passwordRules.map((rule) =>
                            <li className={passValid[rule.key] ? "valid" : ""} key={rule.key}>{rule.label}</li>
                        )}
                    </ul>
                </div>

                <a href="#" className="passforgot" onClick={(e) => { 
                   e.preventDefault();
                   showToast("Password recovery link sent! 📧")}}>forgot password?</a>

                <button type="submit" className="submitBtn" disabled={disableButt}>Submit</button>

                <p>Already have an account?
                    <a href="#" className="signup" onClick={(e) => {
                       e.preventDefault();
                       showToast("Moving to the login page... 🎉")}}> Sign in</a></p>
            </form>

            <div className="toast-container" >
                {toasts.map((toast) => 
                    <div key={toast.id} className="toast">{toast.message}</div>
                )}
            </div>
        </div>
    )
}

export default Form