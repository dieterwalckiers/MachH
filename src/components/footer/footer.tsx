import { component$ } from '@builder.io/qwik';
import facebook from '/logo_facebook_green.png'
import instagram from '/logo_instagram_green.svg'
import SanityImage from '../SanityImage/sanityimage';


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
        <SanityImage url={facebook} alt="Facebook" width={60} height={60} resolutionsOverride={[60]} />
        <SanityImage url={instagram} alt="Instagram" width={60} height={60} resolutionsOverride={[60]} />
      </div>
    </div>
  );
});


export default Footer;