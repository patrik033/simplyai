import {
    CommandInput,
    CommandItem,
    CommandList,
    CommandResponsiveDialog
} from "@/components/ui/command"

import {
    Dispatch,
    SetStateAction
} from "react";



interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a meeting or agent..."
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    )
}

export default DashboardCommand;