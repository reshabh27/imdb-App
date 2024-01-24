import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser } from "../features/user/userSlice";
import SubmitBtn from "../components/SubmitBtn";
import FormInput from "../components/FormInput";



export const action = (store) => async ({ request }) => {
    try {
      // Get form data from the request
      const formData = await request.formData();
      const newData = Object.fromEntries(formData);

      // Fetch user data from Firebase Realtime Database
      const usersData = await customFetch("/users.json");
      console.log(usersData.data);
      // Check if the email exists in the user data
      const userId = Object.keys(usersData.data).find(
        (key) =>
          usersData.data[key].email === newData.email &&
          usersData.data[key].password === newData.password
      );

      if (userId) {
        // Email exists, proceed with login
        const currentUser = usersData.data[userId];
        store.dispatch(
          loginUser({
            user: currentUser,
          })
        );
        return redirect("/");
      } else {
        // Email doesn't exist, handle the error or return null
        const errorMessage = "Invalid email or password";
        console.log(errorMessage);
        alert(errorMessage);
        return null;
      }
    } catch (error) {
      const errorMessage = "Please double-check your credentials";
      console.log(errorMessage);
      alert(errorMessage);
      return null;
    }
  };


const Login = () => {
  return (
    <div style={{backgroundImage: "linear-gradient(to right, #7bd0f9, #68c3ff, #78b1ff, #a299ff, #d277fc)",minHeight:'100vh'}} className="p-5">

      <section className="container bg-white rounded mt-5" style={{width:"30%",minWidth:'275px'}}>
        <Form method="post" className="formcontrol">
          <br />
          <br />
          <h1 className="font-bold	text-5xl authheader">Login</h1>
          <br />
          <br />
          <br />
          <FormInput type="email" label="Email" name="email" />
          <FormInput type="password" label="Password" name="password" />
          <br />
          <div >
            <SubmitBtn text="Login" />
          </div>
          <br /> <br />
          <p className="pb-5">
            Not a member yet?{" "}
            <Link className="btn btn-outline-danger" to="/signup">
              Register
            </Link>
          </p>
        </Form>
      </section>
    </div>
  );
};
export default Login;
