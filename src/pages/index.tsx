import * as React from 'react';
import { CustomLayout } from '@/layout/common/CustomLayout';
import { routes } from '@/common/routes';
import { withLayout } from '@/layout/common/withLayout';
import { StyledWelcomeButton } from '@/modules/welcome/styles/StyledWelcomeButton';
import { StyledWelcomePage } from '@/modules/welcome/styles/StyledWelcomePage';
import { MetaTags } from '@/ui/MetaTags/MetaTags';
import { NextPage } from 'next';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
   const navigate = useRouter()
   const session = useSession();

    console.log("accessToken", session);

    return (
        <StyledWelcomePage>
            <MetaTags title={'Welcome'}/>
            <StyledWelcomeButton onClick={() => navigate.push(routes.MAPS)}>
                Go!
            </StyledWelcomeButton>
        </StyledWelcomePage>
    )
  }

export default withLayout(Home, CustomLayout);
