import type { QRL, Signal } from "@builder.io/qwik";
import { $, useOnDocument, useSignal } from "@builder.io/qwik";

function useOutsideClick(callbackQrl: QRL<() => void>): Signal<Element | undefined> {

    const outputRef = useSignal<Element>();

    useOnDocument(
        'click',
        $(async (event) => {
            if (outputRef.value && !outputRef.value.contains(event.target as Node)) {
                const callback = await callbackQrl.resolve();
                callback();
            }
        })
    );

    return outputRef;
}

/*
    we could also do:
        const useOutsideClick$ = implicit$FirstArg(useOutsideClickQrl);
    implicit$FirstArg makes it so that its wrapping function can be called like:
    useOutsideClick(() => {});
    instead of like this:
    useOutsideClick($(() => {}));
    (https://qwik.builder.io/docs/advanced/dollar/#deep-dive)
    but couldn't get this to work still (vite error "Internal server error: Optimizer should replace all usages of $() with some special syntax. If you need to create a QRL manually, use inlinedQrl() instead.")
*/

export default useOutsideClick;