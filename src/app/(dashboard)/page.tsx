import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/home-view";
//import { caller } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";




const Page = async () => {

//const greeting = await caller.hello({text: "Patrik's Server!"});


  const session = await auth.api.getSession({
    headers: await headers(),
  })

  
  if (!session) {
    redirect("/sign-in");
  }


/*return (
  <div>
    {greeting.greeting}
  </div>
)*/


  return (
    <HomeView />
  );

}

export default Page;



