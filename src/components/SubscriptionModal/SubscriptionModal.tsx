import { component$ } from "@builder.io/qwik";
import { Modal as ModalOrig } from "flowbite-qwik"

const Modal = ModalOrig as any;

interface Props {
    isOpenSignal: any;
}

const SubscriptionModal = component$<Props>(({ isOpenSignal }) => {
    return (
        <Modal
            bind:show={isOpenSignal}
            onClickOutside$={() => {
                console.log('click outside !')
            }}
        >
            ...
        </Modal>
    )
})

export default SubscriptionModal;
