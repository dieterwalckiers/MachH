import { component$ } from "@builder.io/qwik";
import type { ActionStore} from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";
import type { Event } from "~/contract";
import { Input } from "../ui";
import MachHButton from "../shared/machhbutton";

interface Props {
    event: Event;
    subscribeAction: ActionStore<any, any>;
}

const SubscriptionForm = component$<Props>(({ event, subscribeAction }) => {
    return (
        <div class="flex flex-col gap-4 text-machh-primary">
            <h2>Schrijf je in voor "{event.title}"</h2>
            <div class="flex flex-col gap-4">
                <Form action={subscribeAction} /* data={{ slug: event.slug }}*/ >
                    <Input
                        name="firstName"
                        placeholder="Voornaam"
                    />
                    <Input
                        name="lastName"
                        placeholder="Achternaam"
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="email"
                    />
                    <div class="flex justify-end">
                        <MachHButton type="submit">
                            Inschrijven
                        </MachHButton>
                    </div>
                </Form>
            </div>
        </div>
    );
});

export default SubscriptionForm;