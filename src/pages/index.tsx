import { StyledWelcomeButton } from '@/modules/welcome/styles/StyledWelcomeButton';
import { StyledWelcomePage } from '@/modules/welcome/styles/StyledWelcomePage';
import { useRouter } from "next/router";

export default function Home() {
  const navigate = useRouter()

  return (
      <StyledWelcomePage>
        <StyledWelcomeButton onClick={() => navigate.push('/maps')}>
          Go!
        </StyledWelcomeButton>
      </StyledWelcomePage>
  )
}
