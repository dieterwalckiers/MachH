import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import FacebookLogo from '~/img/logo_facebook_green.png?jsx'
import InstagramLogo from '~/img/logo_instagram_green.svg?jsx'


const Footer = component$(() => {
  return (
    <div class="w-full flex justify-between text-machh-primary uppercase border-t-[3px] border-b-[3px] border-machh-primary py-8">
      <div class="flex flex-col">
        <label class="font-semibold block mb-4">Contact</label>
        <label>mach-h vzw</label>
        <label>eendrachtstraat 29</label>
        <label class="block mb-2">9000 Gent</label>
        <Link href="mailto:hallo@mach-h.be" class="cursor-pointer">
          <div class="flex items-center">
            <label class="cursor-pointer">hallo</label>
            <svg class="fill-machh-primary cursor-pointer" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="20" height="20" viewBox="0 0 378.632 378.632"><path d="M377.406 160.981c-5.083-48.911-31.093-92.52-73.184-122.854C259.004 5.538 200.457-6.936 147.603 4.807 97.354 15.971 53.256 48.312 26.571 93.491-.122 138.731-7.098 192.982 7.436 242.39c7.832 26.66 21.729 51.712 40.15 72.51 18.594 20.972 41.904 37.722 67.472 48.459a190.384 190.384 0 0 0 73.653 14.797c34.128-.001 68.115-9.121 97.949-27.098l-21.092-35.081c-40.578 24.451-90.887 28.029-134.652 9.66-40.283-16.96-71.759-52.383-84.211-94.761-11.336-38.595-5.846-81.093 15.125-116.586 20.922-35.467 55.426-60.801 94.622-69.533 41.644-9.225 87.948.669 123.857 26.566 32.502 23.394 52.497 56.769 56.363 93.907 2.515 23.979.31 42.891-6.526 56.226-14.487 28.192-35.526 28.36-43.873 27.132-.283-.041-.476-.082-.65-.117-2.396-3.709-2.091-17.489-1.974-23.473a361.1 361.1 0 0 0 .084-6.664v-112.06h-31.349a105.948 105.948 0 0 0-12.674-8.921c-17.076-10.159-36.858-15.552-57.255-15.552-29.078 0-56.408 10.597-76.896 29.824-32.537 30.543-42.63 80.689-24.551 122.023 8.578 19.62 23.065 35.901 41.876 47.066 17.611 10.434 38.182 15.972 59.47 15.972 24.394 0 46.819-6.735 64.858-19.492a116.362 116.362 0 0 0 5.626-4.233c6.431 8.805 15.811 14.4 27.464 16.114 16.149 2.408 32.299-.259 46.784-7.668 16.453-8.419 29.715-22.311 39.439-41.271 10.684-20.79 14.253-46.676 10.881-79.155zM242.33 224.538c-.891 1.283-2.229 2.907-2.961 3.803-.599.778-1.151 1.46-1.643 2.073-3.868 4.982-8.597 9.48-14.113 13.374-11.26 7.943-25.152 11.964-41.257 11.964-28.968 0-53.462-14.75-63.846-38.544-11.258-25.69-5.071-56.854 15.035-75.692 12.7-11.95 30.538-18.784 48.911-18.784 13.028 0 25.56 3.375 36.268 9.788a65.368 65.368 0 0 1 17.9 15.719 224.58 224.58 0 0 0 1.724 2.094c.952 1.135 2.812 3.438 3.981 5.092v69.113z" /></svg>
            <label class="cursor-pointer">mach-h.be</label>
          </div>
        </Link>
        <label>BTW: BE0777936832</label>

      </div>
      <div class="flex flex-col justify-between">
        <div class="socials flex">
          <Link href="https://www.facebook.com/p/Mach-H-100077590163025" class="cursor-pointer" target="_blank">
            <FacebookLogo alt="Facebook" style={{ width: "60px", height: "60px" }} />
          </Link>
          <Link href="https://instagram.com/mach_h_gent" class="cursor-pointer" target="_blank">
            <InstagramLogo class="dimsixty" style={{ width: "60px", height: "60px " }} />
          </Link>
        </div>
        <Link href="/privacy" >
          <label class="cursor-pointer">Privacy beleid</label>
        </Link>
      </div>
    </div>
  );
});


export default Footer;