import { component$ } from '@builder.io/qwik';
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
        <label>hallo@mach-h.be</label>
        {/* TODO RM LITERAL EMAIL! */}
      </div>
      <div class="flex">
        <FacebookLogo alt="Facebook" style={{ width: "60px", height: "60px" }} />
        <InstagramLogo class="dimsixty" alt="Instagram" style={{ width: "60px", height: "60px "}} />
      </div>
    </div>
  );
});


export default Footer;