import { component$ } from '@builder.io/qwik';
import Banner from '~/components/header/ws_machh_banner.svg?jsx'


const Header = component$(() => {
  return (
    <div class="text-machh-primary w-full mb-4">
      <Banner />
    </div>
  );
});

export default Header;