import { JSXChildren, component$, useContext } from '@builder.io/qwik';
import { useLocation, useContent, Link } from '@builder.io/qwik-city';
import Stamp from '~/img/logo_mach_h_def_stamp.png?jsx'
import useCloseOnOutsideClick from '~/util/useCloseOnOutsideClick';
import { MainContext } from '~/routes/layout';

const MainMenu = component$(() => {
    const { menu } = useContent();
    const { url } = useLocation();

    const mainCtx = useContext(MainContext);

    const ref = useCloseOnOutsideClick();

    return (
        <div class="w-full flex items-center justify-between border-machh-primary border-b-[3px] pb-6">
            <div>
                <Link href="/">
                    <Stamp style={{ width: "60px", height: "60px" }} />
                </Link>
            </div>
            <div class="flex items-center relative">
                <button
                    type="button"
                    class="block md:hidden text-gray-500 hover:text-white focus:text-white focus:outline-none"
                    onClick$={() => (mainCtx.showMobileMenu = !mainCtx.showMobileMenu)}
                >
                    <svg class="h-8 w-8 fill-machh-primary" viewBox="0 0 24 24">
                        {mainCtx.showMobileMenu ? (
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19 13H5v-2h14v2zm0-5H5V6h14v2zm0 10H5v-2h14v2z"
                            />
                        ) : (
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                            />
                        )}
                    </svg>
                </button>
                <nav
                    ref={ref}
                    class={`${mainCtx.showMobileMenu ? 'block' : 'hidden'}
                    text-machh-primary lowercase text-xl font-semibold
                    flex flex-col
                    absolute top-0 right-0
                    bg-white
                    p-4
                    border-2 border-machh-primary
                    md:flex-row
                    md:static md:border-none
                    md:flex md:items-center md:justify-between md:ml-12
                    z-10
                    `}
                >
                    {menu ?
                        menu.items?.reduce((reduced, item, i) => {
                            console.log(`${item.href} vs ${url.pathname}`)
                            reduced.push(
                                <h5
                                    class={`mt-2 ml-4 mr-4 md:mt-0 md:mr-0 md:ml-12 ${url.pathname === item.href ? "underline underline-offset-8" : ""}`}
                                    key={item.href}
                                >
                                    <Link href={item.href} onClick$={() => mainCtx.showMobileMenu = false}>
                                        {item.text}
                                    </Link>
                                </h5>
                            )

                            if (i === 0) { // hack menu to add projects link
                                reduced.push(
                                    <>
                                        <h5
                                            class={`mt-2 ml-4 mr-4 md:mt-0 md:mr-0 md:ml-12 ${url.pathname === item.href ? "underline underline-offset-8" : ""}`}
                                            key={item.href}
                                        >
                                            <label>
                                                projects
                                                {/* pick back up: flesh out */}
                                            </label>
                                        </h5>
                                    </>
                                )
                            }

                            return reduced;
                        }, [] as JSXChildren[])
                        : null}
                </nav>
            </div>
        </div>
    );
});

export default MainMenu;
