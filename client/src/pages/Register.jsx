import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    role:"jobseeker"
  });

  const handleChange = (e)=>{
      setFormData({
          ...formData,
          [e.target.name]:e.target.value
      });
  };

  const handleSubmit = async(e)=>{
      e.preventDefault();

      try{

          const res=await registerUser(formData);

          alert(res.data.message);

      }catch(err){

          alert(err.response?.data?.message || "Registration Failed");

      }
  }

  return(

<div className="min-h-screen flex justify-center items-center">

<form
onSubmit={handleSubmit}
className="bg-white shadow-lg p-8 rounded-xl w-96">

<h2 className="text-3xl font-bold mb-6 text-center">
Register
</h2>

<input
type="text"
name="name"
placeholder="Name"
className="border p-2 w-full mb-4"
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
className="border p-2 w-full mb-4"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
className="border p-2 w-full mb-4"
onChange={handleChange}
/>

<select
name="role"
className="border p-2 w-full mb-4"
onChange={handleChange}>

<option value="jobseeker">
Job Seeker
</option>

<option value="employer">
Employer
</option>

</select>

<button
className="bg-blue-600 text-white w-full p-2 rounded">

Register

</button>

</form>

</div>

  );

}