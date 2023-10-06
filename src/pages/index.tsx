import { StyledWelcomeButton } from '@/modules/welcome/styles/StyledWelcomeButton';
import { StyledWelcomePage } from '@/modules/welcome/styles/StyledWelcomePage';
import { MetaTags } from '@/ui/MetaTags/MetaTags';
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

export default function Home() {
   const navigate = useRouter()

   const session = useSession();

    console.log("accessToken", session);

  return (
      <StyledWelcomePage>
        <MetaTags title={'Welcome'}/>
        <StyledWelcomeButton onClick={() => navigate.push('/maps')}>
          Go!
        </StyledWelcomeButton>
      </StyledWelcomePage>
  )
}
