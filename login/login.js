// =====================================================
// Curonex Login Page JavaScript
// Part 3A
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // DOM Elements
    // ===========================

    const form = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const remember = document.getElementById("remember");

    const togglePassword = document.getElementById("togglePassword");

    const loginButton = document.querySelector(".loginBtn");

    const loader = document.querySelector(".loader");

    const buttonText = loginButton.querySelector("span");

    const toast = document.getElementById("toast");

    let loginAttempts = 0;
    let isSubmitting = false;

    // ===========================
    // Toast
    // ===========================

    function showToast(message, type = "info") {

        toast.innerText = message;

        toast.className = "show";

        switch(type){

            case "success":
                toast.style.background="#16a34a";
                break;

            case "error":
                toast.style.background="#dc2626";
                break;

            case "warning":
                toast.style.background="#f59e0b";
                break;

            default:
                toast.style.background="#2563eb";

        }

        setTimeout(()=>{

            toast.classList.remove("show");

        },3000);

    }

    // ===========================
    // Trim Spaces
    // ===========================

    username.addEventListener("blur",()=>{

        username.value=username.value.trim();

    });

    password.addEventListener("blur",()=>{

        password.value=password.value.trim();

    });

    // ===========================
    // Password Toggle
    // ===========================

    togglePassword.addEventListener("click",()=>{

        if(password.type==="password"){

            password.type="text";

            togglePassword.classList.remove("fa-eye");

            togglePassword.classList.add("fa-eye-slash");

        }

        else{

            password.type="password";

            togglePassword.classList.remove("fa-eye-slash");

            togglePassword.classList.add("fa-eye");

        }

    });

    // ===========================
    // Email Validation
    // ===========================

    function validEmail(email){

        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }

    // ===========================
    // Indian Mobile Validation
    // ===========================

    function validPhone(phone){

        return /^[6-9]\d{9}$/.test(phone);

    }

    // ===========================
    // Password Validation
    // ===========================

    function validPassword(pass){

        return pass.length>=8;

    }

    // ===========================
    // Remember Me
    // ===========================

    if(localStorage.getItem("rememberMe")==="true"){

        username.value=localStorage.getItem("savedUsername") || "";

        remember.checked=true;

    }

    remember.addEventListener("change",()=>{

        if(remember.checked){

            localStorage.setItem("rememberMe","true");

            localStorage.setItem("savedUsername",username.value);

        }

        else{

            localStorage.removeItem("rememberMe");

            localStorage.removeItem("savedUsername");

        }

    });

    username.addEventListener("input",()=>{

        if(remember.checked){

            localStorage.setItem("savedUsername",username.value);

        }

    });

    // ===========================
    // Caps Lock Detection
    // ===========================

    password.addEventListener("keyup",(e)=>{

        if(e.getModifierState("CapsLock")){

            showToast("Caps Lock is ON","warning");

        }

    });

    // ===========================
    // Prevent Spaces
    // ===========================

    username.addEventListener("keydown",(e)=>{

        if(e.key===" "){

            e.preventDefault();

        }

    });

    // ===========================
    // Prevent Multiple Clicks
    // ===========================

    function setLoading(state){

        if(state){

            loader.style.display="block";

            buttonText.style.display="none";

            loginButton.disabled=true;

        }

        else{

            loader.style.display="none";

            buttonText.style.display="block";

            loginButton.disabled=false;

        }

    }
    // =====================================================
// PART 3B - Login Logic
// =====================================================

// ---------- Authentication ----------

function authenticate(user, pass){

    // Demo credentials
    const validUsers=[

        {
            username:"admin@curonex.com",
            password:"Admin@123",
            role:"Administrator"
        },

        {
            username:"doctor@curonex.com",
            password:"Doctor@123",
            role:"Doctor"
        },

        {
            username:"patient@curonex.com",
            password:"Patient@123",
            role:"Patient"
        },

        {
            username:"delivery@curonex.com",
            password:"Delivery@123",
            role:"Delivery Partner"
        }

    ];

    return validUsers.find(account=>

        account.username.toLowerCase()===user.toLowerCase()
        &&
        account.password===pass

    );

}


// ---------- Login ----------

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(isSubmitting) return;

    const user=username.value.trim();

    const pass=password.value;

    // Empty fields

    if(user===""){

        showToast("Please enter your email or mobile number.","error");

        username.focus();

        return;

    }

    if(pass===""){

        showToast("Please enter your password.","error");

        password.focus();

        return;

    }

    // Email / Mobile validation

    const email=validEmail(user);

    const phone=validPhone(user);

    if(!email && !phone){

        showToast("Enter a valid email or phone number.","warning");

        username.focus();

        return;

    }

    // Password validation

    if(!validPassword(pass)){

        showToast("Password must contain at least 8 characters.","warning");

        password.focus();

        return;

    }

    // Offline

    if(!navigator.onLine){

        showToast("No internet connection.","error");

        return;

    }

    isSubmitting=true;

    setLoading(true);

    // Simulate API request

    setTimeout(()=>{

        const account=authenticate(user,pass);

        if(account){

            loginAttempts=0;

            sessionStorage.setItem("loggedIn","true");

            sessionStorage.setItem("username",user);

            sessionStorage.setItem("role",account.role);

            showToast("Login Successful","success");

            setTimeout(()=>{

                // Replace with dashboard

                window.location.href="dashboard.html";

            },1200);

        }

        else{

            loginAttempts++;

            setLoading(false);

            isSubmitting=false;

            password.value="";

            password.focus();

            if(loginAttempts>=5){

                loginButton.disabled=true;

                showToast("Too many failed attempts. Wait 30 seconds.","error");

                setTimeout(()=>{

                    loginAttempts=0;

                    loginButton.disabled=false;

                },30000);

            }

            else{

                showToast(

                    "Invalid username or password.",

                    "error"

                );

            }

        }

    },1800);

});


// ---------- Enter Key ----------

username.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        password.focus();

    }

});

password.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        form.requestSubmit();

    }

});


// ---------- Forgot Password ----------

document

.getElementById("forgotPassword")

.addEventListener("click",(e)=>{

    e.preventDefault();

    showToast(

        "Password recovery page coming soon.",

        "info"

    );

});


// ---------- Register ----------

document

.getElementById("registerBtn")

.addEventListener("click",()=>{

    window.location.href="register.html";

});


// ---------- Contact Support ----------

const supportButton=document.querySelector(".support-card button");

if(supportButton){

supportButton.addEventListener("click",()=>{

showToast(

"Support is available 24/7.",

"info"

);

});

}


// ---------- Social Login ----------

document

.querySelectorAll(".social button")

.forEach(button=>{

button.addEventListener("click",()=>{

showToast(

"Social login is not implemented in demo.",

"warning"

);

});

});


// ---------- Disable Button if Empty ----------

function updateButton(){

const filled=

username.value.trim()!=="" &&

password.value.trim()!=="";

loginButton.disabled=!filled;

}

username.addEventListener("input",updateButton);

password.addEventListener("input",updateButton);

updateButton();
// =====================================================
// PART 3C - Edge Cases & Final Initialization
// =====================================================

// -----------------------------
// Online / Offline Detection
// -----------------------------

window.addEventListener("offline", () => {

    showToast("Internet connection lost.", "error");

    loginButton.disabled = true;

});

window.addEventListener("online", () => {

    showToast("Connection restored.", "success");

    updateButton();

});

// -----------------------------
// Idle Session Timeout
// -----------------------------

let idleTimer;

function resetIdleTimer() {

    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {

        sessionStorage.clear();

        showToast("Session expired due to inactivity.","warning");

    }, 900000); // 15 minutes

}

["mousemove","keydown","click","scroll","touchstart"].forEach(event => {

    document.addEventListener(event, resetIdleTimer);

});

resetIdleTimer();

// -----------------------------
// Input Sanitization
// -----------------------------

function sanitizeInput(value){

    return value
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"")
        .replace(/'/g,"")
        .trim();

}

username.addEventListener("input",()=>{

    username.value=sanitizeInput(username.value);

});

// -----------------------------
// Password Paste Warning
// -----------------------------

password.addEventListener("paste",(e)=>{

    showToast("Pasting passwords is discouraged.","warning");

});

// -----------------------------
// Prevent Rapid Submit
// -----------------------------

let lastSubmit=0;

form.addEventListener("submit",(e)=>{

    const now=Date.now();

    if(now-lastSubmit<2000){

        e.preventDefault();

        showToast("Please wait before trying again.","warning");

        return;

    }

    lastSubmit=now;

},true);

// -----------------------------
// Autofill Detection
// -----------------------------

window.addEventListener("load",()=>{

    setTimeout(()=>{

        updateButton();

    },500);

});

// -----------------------------
// Clear Password on Refresh
// -----------------------------

window.addEventListener("beforeunload",()=>{

    password.value="";

});

// -----------------------------
// Browser Visibility
// -----------------------------

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        console.log("Login page hidden");

    }

    else{

        console.log("Login page active");

    }

});

// -----------------------------
// Copy Username
// -----------------------------

username.addEventListener("copy",()=>{

    showToast("Username copied.","info");

});

// -----------------------------
// Disable Context Menu on Password
// -----------------------------

password.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});

// -----------------------------
// Focus First Empty Field
// -----------------------------

window.addEventListener("load",()=>{

    if(username.value===""){

        username.focus();

    }

    else{

        password.focus();

    }

});

// -----------------------------
// Accessibility
// -----------------------------

username.setAttribute("autocomplete","username");

password.setAttribute("autocomplete","current-password");

username.setAttribute("spellcheck","false");

password.setAttribute("spellcheck","false");

// -----------------------------
// Console Welcome
// -----------------------------

console.log("%cCuronex Login Portal",
"font-size:20px;color:#0A4FD9;font-weight:bold;");

console.log("JavaScript Loaded Successfully");

// -----------------------------
// ESC Clears Password
// -----------------------------

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        password.value="";

    }

});

// -----------------------------
// Warn if Cookies Disabled
// -----------------------------

if(!navigator.cookieEnabled){

    showToast(

        "Cookies are disabled in your browser.",

        "warning"

    );

}

// -----------------------------
// Welcome Message
// -----------------------------

setTimeout(()=>{

    showToast(

        "Welcome to Curonex.",

        "info"

    );

},700);

// -----------------------------
// Final Initialization
// -----------------------------

updateButton();

setLoading(false);

isSubmitting=false;

});
// ===== END OF FILE =====