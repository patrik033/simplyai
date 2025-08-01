"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";

const AgentsListHeader = () => {

    const [openDialog, setOpenDialog] = useState(false);








    return (
        <>
            <NewAgentDialog open={openDialog} onOpenChange={setOpenDialog} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button onClick={() => setOpenDialog(true)}>
                        <PlusIcon className="size-6" />
                        New Agent
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AgentsListHeader;