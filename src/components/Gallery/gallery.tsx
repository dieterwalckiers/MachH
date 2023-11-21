import { component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import FixedImage from "~/components/FixedImage/FixedImage";
import { MainContext } from "~/routes/layout";
import { isMobile } from "~/util/rwd";

interface Props {
    gallery?: any[];
}
const Gallery = component$<Props>(({ gallery }) => {

    const detailVisible = useSignal<boolean>(false);
    const activeImgPos = useSignal<number>(0);
    const mainCtx = useContext(MainContext);

    console.log("activeImgPos", activeImgPos.value);

    useVisibleTask$(({ track }) => {
        track(() => detailVisible.value);
        if (detailVisible.value) {
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    return (
        <>
            <div class="flex mt-4 w-full flex-wrap">
                {(gallery || []).map((photo, index) => (
                    <div
                        key={`galdivimg${index}`}
                        class="float-left mr-4 mb-4 cursor-pointer hover:outline hover:outline-4 hover:outline-mach-primary"
                        onClick$={() => {
                            activeImgPos.value = index;
                            detailVisible.value = true;
                        }}
                    >
                        <FixedImage
                            url={photo}
                            alt={`gallery image ${index}`}
                            // eslint-disable-next-line qwik/no-react-props
                            width={90} height={90}
                            resolutionsOverride={[90]}
                        />
                    </div>
                ))}
            </div>
            {
                detailVisible.value && (
                    <div
                        class="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.8)] flex items-center justify-center z-20"
                        onClick$={() => {
                            detailVisible.value = false;
                        }}
                    >
                        <div class="w-full md:w-[600px]">
                            <FixedImage
                                url={(gallery || [undefined])[activeImgPos.value]}
                                key={`galimg${activeImgPos.value}`}
                                alt={`gallery image 0`}
                                // eslint-disable-next-line qwik/no-react-props
                                className="float-left mr-4 mb-4"
                                width={isMobile(mainCtx.screenSize) ? 400 : 1200}
                                resolutionsOverride={[400, 1200]}
                            />
                            <div class="flex justify-between w-full">
                                {activeImgPos.value > 0 ? (
                                    <div class="left-button cursor-pointer" onClick$={(e) => { activeImgPos.value = activeImgPos.value - 1; e.stopPropagation(); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                ) : <div></div>}
                                {activeImgPos.value < (gallery || []).length - 1 ? (
                                    <div class="right-button cursor-pointer" onClick$={(e) => { activeImgPos.value = activeImgPos.value + 1; e.stopPropagation(); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9.293 16.707a1 1 0 010-1.414L13.586 11H3a1 1 0 010-2h10.586l-4.293-4.293a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                ) : <div></div>}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
})
export default Gallery;