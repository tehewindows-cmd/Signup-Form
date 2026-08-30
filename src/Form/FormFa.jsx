import { useState, useEffect } from "react";

function FormFa() {

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
        {key: "length", label: "حداقل ۸ کاراکتر", test: value => value.length >= 8 },
        {key: "upper", label: "یک حرف بزرگ", test: value => /[A-Z]/.test(value) },
        {key: "number", label: "یک عدد", test: value => /[0-9]/.test(value) },
        {key: "symbol", label: "یک علامت خاص", test: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) }
    ];

    const isPhoneValid = currentPhone.length === 11 && currentPhone.startsWith("09");
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

        const newPhone = event.target.value.replace(/\D/g, "").slice(0, 11);
        setCurrentPhone(newPhone)

        if(newPhone === "") {
            setError(e => ({...e, phone: ""}));
        }else if(!newPhone.startsWith("09")) {
            setError(e => ({...e, phone: "شماره تلفن نامعتبر است"}));
        }else if(newPhone.length < 11) {
            setError(e => ({...e, phone: "شماره تلفن باید 11 رقم باشد"}));
        }else {
            setError(e => ({...e, phone: ""}));
        }
    }

    function handleEmailChange(event) {

        const newEmail = event.target.value;
        setCurrentEmail(newEmail);

        if(newEmail === "") {
            setError(e => ({...e, email: ""}));
        }else if(!emailPattern.test(newEmail)) {
            setError(e => ({...e, email: "ایمیل نامعتبر است"}));
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
                  showToast("🎉 ✓ثبت نام با موفقیت انجام شد")}}>
                    
                <h1 className="card-header">ثبت نام</h1>

                <label htmlFor="phone">شماره تلفن <span className={`required ${isPhoneValid ? "true" : ""}`}>*</span></label>
                <div className="input-wrapper">
                    <i className="fa-solid fa-phone icon-input"></i>
                    <input type="tel" value={currentPhone} className="notranslate" inputMode="numeric" pattern="[0-9]*" maxLength="11" placeholder="09*********" required id="phone"
                           onChange={handlePhoneChange} />
                </div>
                <small className="error-msg" aria-live="polite">{error.phone}</small>

                <label htmlFor="email">ایمیل <span className={`required ${isEmailValid ? "true" : ""}`}>*</span></label>
                <div className="input-wrapper">
                    <i className="fa-solid fa-envelope icon-input"></i>
                    <input type="email" value={currentEmail} className="notranslate" placeholder="name@example.com" required id="email"
                           onChange={handleEmailChange}/>
                </div>
                <small className="error-msg" aria-live="polite">{error.email}</small>

                <label htmlFor="pass">رمز عبور <span className={`required ${isPassValid ? "true" : ""}`}>*</span></label>
                <div className="password-wrapper">
                    <i className="fa-solid fa-lock icon-input"></i>
                    <input type={showPass ? "text" : "password"} value={currentPass} placeholder="••••••••••••" required id="pass"
                           onChange={handlePassChange} />
                    
                    <button type="button" className="toggle-password" aria-label="نمایش رمز عبور"
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
                   showToast("📧 !لینک بازیابی رمز عبور ارسال شد")}}>رمز عبور را فراموش کرده‌اید؟</a>

                <button type="submit" className="submitBtn" disabled={disableButt}>تایید</button>

                <p>حساب کاربری دارید؟
                    <a href="#" className="signup" onClick={(e) => {
                       e.preventDefault();
                       showToast("🎉 ...در حال انتقال به صفحه ورود")}}> ورود</a></p>
            </form>

            <div className="toast-container" >
                {toasts.map((toast) => 
                    <div key={toast.id} className="toast">{toast.message}</div>
                )}
            </div>
        </div>
    )
}

export default FormFa