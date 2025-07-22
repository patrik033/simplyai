"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {





  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
  }

  const onSubmit = async () => {
    await authClient.signUp.email({
      email,
      password,
      name,
    },
      {
        onError: (error) => {

          resetInputs();
          window.alert(`Error creating user: ${error}`);
        },
        onSuccess: () => {
          resetInputs();
          window.alert("User created successfully");
        },

      }



    );
  };

  const onSignIn = async () => {
    await authClient.signIn.email({
      email,
      password,
    });
    resetInputs();
  };

  if (session) {
    return (
      <div className="flex flex-col gap-4 w-3/5 mx-auto">
        <h1>Logged in as {session.user.name}</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-4 w-3/5 mx-auto">

      <div className="flex flex-col gap-4 w-3/5 mx-auto m-10">
        <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={onSubmit}>


          Create User
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-3/5 mx-auto m-10">
        <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
