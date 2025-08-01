import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { agentsInsertSchema } from "../../schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GeneratedAvatar from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initalValues?: AgentGetOne;
}


export const AgentForm = ({ onSuccess, onCancel, initalValues }: AgentFormProps) => {

    const trpc = useTRPC()
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions(),
                );

                if (initalValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initalValues.id })
                    );
                }

                onSuccess?.();
            },
            onError: (error) => { 
                toast.error(error.message)

                //TODO: check if error code is 'Forbidden', redirect to /upgrade
            }
        })
    );

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initalValues?.name ?? "",
            instructions: initalValues?.instructions ?? "",
        },
    });

    const isEdit = !!initalValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (data: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            // updateAgent.mutate({
            //     id: initalValues?.id,
            // })
            console.log("TODO: update agent");
        } else {
            createAgent.mutate(data);
        }
    }
    //form in form checks that we didnt do antything wrong before we submit it.
    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className="size-16 border"
                />

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. My Agent" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="You are a helpful math assistant the can answer questions and helpt
                                with assignments." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-2">
                    {onCancel && (
                        <Button variant="ghost" disabled={isPending} type="button" onClick={() => onCancel()}>
                            Cancel
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

