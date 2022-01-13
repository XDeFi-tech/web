import { Flex, Stack } from '@chakra-ui/react'
import { CAIP19 } from '@shapeshiftoss/caip'
import { Page } from 'components/Layout/Page'
import { TxHistory } from 'components/TxHistory'
import { AccountSpecifier } from 'state/slices/portfolioSlice/portfolioSlice'

import { AccountTokens } from './AccountTokens'
import { AssetHeader } from './AssetHeader/AssetHeader'
import { StakingVaults } from './StakingVaults/StakingVaults'
import { UnderlyingToken } from './UnderlyingToken'

type AssetDetailsProps = {
  caip19: CAIP19
  accountId?: AccountSpecifier
}

export const AssetAccountDetails = ({ caip19, accountId }: AssetDetailsProps) => {
  return (
    <Page style={{ width: '100%' }}>
      <Flex flexGrow={1} zIndex={2} flexDir={{ base: 'column', lg: 'row' }}>
        <Stack
          spacing='1.5rem'
          maxWidth={{ base: 'auto', lg: '50rem' }}
          flexBasis='50rem'
          p={{ base: 0, lg: 4 }}
          mx={{ base: 0, lg: 'auto' }}
        >
          <AssetHeader caip19={caip19} accountId={accountId} />
          {accountId && <AccountTokens caip19={caip19} accountId={accountId} />}
          <StakingVaults caip19={caip19} accountId={accountId} />
          <UnderlyingToken caip19={caip19} accountId={accountId} />
          <TxHistory caip19={caip19} accountId={accountId} />
        </Stack>
      </Flex>
    </Page>
  )
}
