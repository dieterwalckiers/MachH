import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";
import type { Event } from "~/contract";
import { Input } from "../ui";
import MachHButton from "../shared/machhbutton";
import { summarizeErrors } from "./helpers";

interface Props {
    event: Event;
    subscribeAction: ActionStore<any, any>;
}

const SubscriptionForm = component$<Props>(({ event, subscribeAction }) => {

    const formRef = useSignal<HTMLFormElement>();

    const mathNumber1 = Math.floor(Math.random() * 10) + 1;
    const mathNumber2 = Math.floor(Math.random() * 10) + 1;

    const mathQuestion = `Hoeveel is ${mathNumber1} + ${mathNumber2}?`;
    const mathSolution = mathNumber1 + mathNumber2;

    useTask$(({ track }) => {
        const success = track(() => subscribeAction.value?.success);
        if (success && formRef.value) {
            formRef.value.reset();
        }
    });

    return (
        <div class="flex flex-col gap-4 text-machh-primary">
            <h2>Schrijf je in voor "{event.title}"</h2>
            <div class="flex flex-col gap-4 text-sm">
                <Form action={subscribeAction} /* data={{ slug: event.slug }}*/ class="flex flex-col gap-2" ref={formRef}>
                    <div>
                        <label class="text-machh-primary">Voornaam</label>
                        <Input name="firstName" />
                    </div>
                    <div>
                        <label class="text-machh-primary">Achternaam</label>
                        <Input name="lastName" />
                    </div>
                    <div>
                        <label class="text-machh-primary">Email</label>
                        <Input name="email" type="email" />
                    </div>
                    <div>
                        <label class="text-machh-primary">{mathQuestion}</label>
                        <Input name="mathQuestion" type="number" />
                    </div>
                    <input type="hidden" name="mathSolution" value={mathSolution} />
                    <input type="hidden" name="eventSlug" value={event.slug} />
                    <input type="hidden" name="eventConfirmationMailSubject" value={event.confirmationMailSubject} />
                    <input type="hidden" name="eventConfirmationMailBody" value={event.confirmationMailBody} />
                    {subscribeAction.value?.failed && (
                        <div class="text-red-500">
                            {summarizeErrors(subscribeAction.value.fieldErrors)}
                        </div>
                    )}
                    {subscribeAction.value?.error && (
                        <div class="text-red-500 my-4">
                            Inschrijving mislukt :( Stuur ons gerust een mailtje
                        </div>
                    )}
                    {subscribeAction.value?.success ? (
                        <div class="text-green-500 my-4">
                            Je bent ingeschreven voor "{event.title}"!
                        </div>
                    ) : (
                        <div class="flex justify-end">
                            <MachHButton type="submit">
                                Inschrijven
                            </MachHButton>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
});

export default SubscriptionForm;