// import { $, component$, useContext, useStore, useVisibleTask$ } from '@builder.io/qwik';
// import type { Event } from '../../contract';
// import EventTile from "./eventtile";
// import { MainContext } from '~/routes/layout';

// export interface Props {
//     events: Event[];
// }


// const NextEvents = component$<Props>(({ events }) => {

//     const store = useStore<{ offset: number, limit: number, showArrows: boolean }>({
//         offset: 0,
//         limit: 1,
//         showArrows: true,
//     });

//     const mainCtx = useContext(MainContext);

//     useVisibleTask$(({ track }) => {
//         console.log("mainCtx.screenSize", mainCtx.screenSize)
//         switch (mainCtx.screenSize) {
//             case "my-xs":
//                 store.limit = 1;
//                 break;
//             case "md":
//             case "sm":
//                 store.limit = 2;
//                 break;
//             default:
//                 store.limit = 3;
//         }
//         track(() => mainCtx.screenSize);
//     });

//     return (
//         <div class="nextevents w-full text-machh-primary border-b-[3px] border-machh-primary py-6 font-semibold uppercase">
//             <h3 class="text-machh-primary font-semibold text-xl uppercase mb-6">
//                 Komende activiteiten
//             </h3>
//             <div class="flex justify-between">
//                 {
//                     store.showArrows && store.offset > 0 ? (
//                         <button
//                             type="button"
//                             class="text-machh-primary text-4xl px-4"
//                             onClick$={() => (store.offset -= 1)}
//                             style={{ transform: 'rotate(180deg)' }}
//                         >
//                             <>&rsaquo;</>
//                         </button>
//                     ) : null
//                 }
//                 {
//                     store.limit ? events.slice(store.offset, store.offset + store.limit).map((event, i) => (
//                         <EventTile event={event} key={`etile${i}`} />
//                     )) : null
//                 }
//                 {
//                     store.showArrows ? (
//                         <button
//                             type="button"
//                             class="text-machh-primary text-4xl px-4"
//                             onClick$={() => store.offset < events.length - store.limit ?
                                
//                                 (store.offset += 1)}
//                         >
//                             <>&rsaquo;</>
//                         </button>
//                     ) : null
//                 }
//             </div>
//         </div>
//     );
// });

// export default NextEvents;

export default "";