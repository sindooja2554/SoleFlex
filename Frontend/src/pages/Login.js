// // import { LockClosedIcon } from "@heroicons/react/20/solid";
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../AuthContext";

// function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const authContext = useContext(AuthContext);
//   const navigate = useNavigate();


//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const authCheck = () => {
//     setTimeout(() => {
//       fetch("http://localhost:4000/api/login")
//         .then((response) => response.json())
//         .then((data) => {
//           alert("Successfully Login");
//           localStorage.setItem("user", JSON.stringify(data));
//           authContext.signin(data._id, () => {
//             navigate("/");
//           });
//         })
//         .catch((err) => {
//           alert("Wrong credentials, Try again")
//           console.log(err);
//         });
//     }, 3000);
//   };

//   const loginUser = (e) => {
//     // Cannot send empty data
//     if (form.email === "" || form.password === "") {
//       alert("To login user, enter details to proceed...");
//     } else {
//       fetch("http://localhost:4000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(form),
//       })
//         .then((result) => {
//           console.log("User login", result);
//         })
//         .catch((error) => {
//           console.log("Something went wrong ", error);
//         });
//     }
//     authCheck();
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

  
//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center">
//         <div className="flex justify-center">
//           <img src={require("../assets/signup.jpg")} alt="" />
//         </div>
//         <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
//           <div>
//             <img
//               className="mx-auto h-12 w-auto"
//               src={require("../assets/logo_1.png")}
//               alt="Your Company"
//             />
//             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
//               Signin to your account
//             </h2>
//             {/* <p className="mt-2 text-center text-sm text-gray-600">
//               Or
//               <span
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 start your 14-day free trial
//               </span>
//             </p> */}
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             {/* <input type="hidden" name="remember" defaultValue="true" /> */}
//             <div className="-space-y-px rounded-md shadow-sm">
//               <div>
//                 <label htmlFor="email-address" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   placeholder="Email address"
//                   value={form.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   placeholder="Password"
//                   value={form.password}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <span
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Forgot your password?
//                 </span>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 onClick={loginUser}
//               >
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   {/* <LockClosedIcon
//                     className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
//                     aria-hidden="true"
//                   /> */}
//                 </span>
//                 Sign in
//               </button>
//               <p className="mt-2 text-center text-sm text-gray-600">
//                 Or{" "}
//                 <span
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   {/* Don't Have an Account, Please{" "} */}
//                   <Link to="/register"> Don't Have an Account, Please Register now </Link>
//                 </span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;


import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import UploadImage from "../components/UploadImage";

function Login() {
  // Separate form states for Login and Register
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle input change for Login form
  const handleLoginInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Handle input change for Register form
  const handleRegisterInputChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // Login logic
  const authCheck = () => {
    setTimeout(() => {
      fetch("http://localhost:4000/api/login")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Login");
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            if (data.role === 0) {
              navigate("/purchase-details");
            } else {
            navigate("/");
            }
          });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again");
          console.log(err);
        });
    }, 3000);
  };

  const loginUser = (e) => {
    if (loginForm.email === "" || loginForm.password === "") {
      alert("To login user, enter details to proceed...");
    } else {
      fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginForm),
      })
        .then((result) => {
          console.log("User login", result);
        })
        .catch((error) => {
          console.log("Something went wrong ", error);
        });
    }
    authCheck();
  };

  // Register logic
  const registerUser = () => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registerForm),
    })
      .then((result) => {
        alert("Successfully Registered, Now Login with your details");
        // Optionally reset the register form
        setRegisterForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          imageUrl: "",
        });
      })
      .catch((err) => console.log(err));
  };

  // Image upload for registration
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setRegisterForm({ ...registerForm, imageUrl: data.url });
        alert("Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="mb-8">
        <img
          className="mx-auto h-12 w-auto"
          src={require("../assets/logo_1.png")}
          alt="SoleFlex"
        />
      </div>

      {/* Side-by-Side Forms */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold tracking-tight mb-6 text-custom-blue">
            Sign in to your account
          </h2>
          <span className="text-xs text-gray-500 pb-4">See your growth & get support!</span>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="login-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  value={loginForm.email}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div>
                <label htmlFor="login-password" className="sr-only">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-custom-blue text-custom-blue focus:ring-custom-blue"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

              <div className="text-sm">
                <span className="font-medium" style={{ color: "#0a245c" }}>
                  Forgot your password?
                </span>
              </div>
            </div>

            <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-custom-blue py-2 px-3 text-sm font-semibold text-white hover:bg-custom-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-blue"
              onClick={loginUser}
            >
              Sign in
            </button>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold tracking-tight mb-6 text-custom-blue">
            Register your account
          </h2>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-custom-blue">
              Manage all your inventory efficiently
            </span>
            <span className="text-xs text-gray-500 pb-4">
              Let's get you all set up so you can veridy your personal account and begin setting up your work profile
            </span>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  name="firstName"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="First Name"
                  value={registerForm.firstName}
                  onChange={handleRegisterInputChange}
                />
                <input
                  name="lastName"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Last Name"
                  value={registerForm.lastName}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  value={registerForm.email}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div>
                <input
                  name="phoneNumber"
                  type="number"
                  autoComplete="phoneNumber"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Phone Number"
                  value={registerForm.phoneNumber}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <UploadImage uploadImage={uploadImage} />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-custom-blue text-custom-blue focus:ring-custom-blue"
                checked
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I Agree to Terms & Conditions
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-custom-blue py-2 px-3 text-sm font-semibold text-white hover:bg-custom-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-blue"
                onClick={registerUser}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;